import { InjectionToken, computed, inject } from '@angular/core';
import { TTodosCallState, TTodosMeta } from '../types';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TodoService } from '../services/todo.service';
import {
  catchError,
  concatMap,
  finalize,
  of,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  addEntities,
  removeEntity,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import {
  setError,
  setLoaded,
  setLoading,
  withSelectedEntity,
} from '../features';
import { ITodoResponse } from '../responses';
import { ITodoRequest } from '../requests/todos';

const initialState: TTodosMeta = {
  lastRefreshed: null,
  lastUpdated: null,
};

const TODOS_META = new InjectionToken<TTodosMeta>('TodosMeta', {
  factory: () => initialState,
});

export const TodosStore = signalStore(
  withState(() => inject(TODOS_META)),
  withState<{ callState: TTodosCallState }>({ callState: 'init' }),
  withEntities<ITodoResponse>(),
  withSelectedEntity(),
  withComputed(({ entities, callState }) => ({
    todosCount: computed(() => entities().length),
    loading: computed(() => callState() === 'loading'),
    loaed: computed(() => callState() === 'loaded'),
    error: computed(() => {
      const state = callState();

      return typeof state === 'object' ? state.error : null;
    }),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    getAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, setLoading())),
        switchMap(() =>
          todoService.getAllTodo().pipe(
            tap((entities) =>
              patchState(store, addEntities(entities), {
                lastRefreshed: new Date(),
              })
            ),
            catchError(() => {
              patchState(
                store,
                setError('Não foi possivel recuperar os dados')
              );
              return of([]);
            }),
            finalize(() => patchState(store, setLoaded()))
          )
        )
      )
    ),

    createTodo: rxMethod<ITodoRequest>(
      pipe(
        tap(() => patchState(store, setLoading())),
        concatMap((todo) =>
          todoService.createTodo(todo).pipe(
            concatMap(() =>
              todoService.getAllTodo().pipe(
                tap((entities) => {
                  const date = new Date();

                  patchState(store, addEntities(entities), {
                    selectedEntityId: null,
                    lastUpdated: date,
                    lastRefreshed: date,
                  });
                })
              )
            ),
            catchError(() => {
              patchState(store, setError('Ouve um erro ao criar nova tarefa'));
              return of();
            }),
            finalize(() => patchState(store, setLoaded()))
          )
        )
      )
    ),

    updateTodo: rxMethod<{ params: ITodoRequest; id: number | string }>(
      pipe(
        tap(() => {
          patchState(store, setLoading());
        }),
        concatMap((todo) =>
          todoService.updateTodo(todo.params, todo.id).pipe(
            tap(() =>
              patchState(
                store,
                updateEntity({
                  id: todo.id,
                  changes: {
                    title: todo.params.title,
                    description: todo.params.description,
                    status: todo.params.status,
                  },
                }),
                { lastUpdated: new Date(), selectedEntityId: null }
              )
            ),
            catchError(() => {
              patchState(store, setError('Ouve um erro ao atualizar a tarefa'));
              return of();
            }),
            finalize(() => patchState(store, setLoaded()))
          )
        )
      )
    ),

    removeTodo: rxMethod<number | string>(
      pipe(
        tap(() => patchState(store, setLoading())),
        concatMap((id) =>
          todoService.removeTodo(id).pipe(
            tap(() =>
              patchState(store, removeEntity(id), { lastUpdated: new Date() })
            ),
            catchError(() => {
              patchState(store, setError('Ouve um erro ao remover a tarefa'));
              return of();
            })
          )
        ),
        finalize(() => patchState(store, setLoaded()))
      )
    ),

    setSelectId(id: string | number | null): void {
      patchState(store, { selectedEntityId: id });
    },
  })),
  withHooks({
    onInit(store) {
      store.getAll();
    },
  })
);
