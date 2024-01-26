import { InjectionToken, computed, inject } from '@angular/core';
import { TTodosState } from '../types';
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
  exhaustMap,
  finalize,
  of,
  pipe,
  switchMap,
  tap,
} from 'rxjs';
import {
  addEntities,
  setEntities,
  setEntity,
  updateEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { withSelectedEntity } from '../features';
import { ITodoResponse } from '../responses';
import { ITodoRequest } from '../requests/todos';

const initialState: TTodosState = {
  is_loading: false,
  error: null,
};

const TODOS_STATE = new InjectionToken<TTodosState>('TodosState', {
  factory: () => initialState,
});

export const TodosStore = signalStore(
  withState(() => inject(TODOS_STATE)),
  withEntities<ITodoResponse>(),
  withSelectedEntity(),
  withComputed(({ entities }) => ({
    todosCount: computed(() => entities().length),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    getAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { is_loading: true })),
        switchMap(() =>
          todoService.getAllTodo().pipe(
            tap((entities) => patchState(store, addEntities(entities))),
            catchError(() => {
              patchState(store, { error: 'Ouve um error' });
              return of([]);
            }),
            finalize(() => patchState(store, { is_loading: false }))
          )
        )
      )
    ),
    createTodo: rxMethod<ITodoRequest>(
      pipe(
        tap(() => patchState(store, { is_loading: true })),
        concatMap((todo) =>
          todoService.createTodo(todo).pipe(
            concatMap(() =>
              todoService.getAllTodo().pipe(
                tap((entities) => {
                  patchState(store, { selectedEntityId: null });
                  patchState(store, addEntities(entities));
                })
              )
            ),
            catchError(() => {
              patchState(store, { error: 'Ouve um erro ao criar nova tarefa' });
              return of();
            }),
            finalize(() => patchState(store, { is_loading: false }))
          )
        )
      )
    ),
    updateTodo: rxMethod<{ params: ITodoRequest; id: number | string }>(
      pipe(
        tap((data) => {
          patchState(
            store,
            setEntities({
              
              title: data.params.title,
              description: data.params.description,
              status: data.params.status,
            })
          );
          patchState(store, { is_loading: true });
        }),
        concatMap((data) =>
          todoService.updateTodo(data.params, data.id).pipe(
            concatMap(() =>
              todoService.getAllTodo().pipe(
                tap((entities) => {
                  patchState(store, { selectedEntityId: null });
                  patchState(store, setEntities(entities));
                })
              )
            ),
            catchError(() => {
              patchState(store, {
                error: 'Ouve um erro ao atualizar a tarefa',
              });
              return of();
            }),
            finalize(() => patchState(store, { is_loading: false }))
          )
        )
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
