import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, first } from 'rxjs';
import { ITodoResponse } from '../responses';
import { CApiResources } from '../consts';
import { ITodoRequest } from '../requests/todos';

@Injectable()
export class TodoService {
  #http = inject(HttpClient);

  getAllTodo(): Observable<ITodoResponse[]> {
    return this.#http
      .get<ITodoResponse[]>(CApiResources.TodoEndpoint.getAllTodos)
      .pipe(first());
  }

  createTodo(params: ITodoRequest): Observable<ITodoResponse> {
    return this.#http
      .post<ITodoResponse>(CApiResources.TodoEndpoint.createPost, params)
      .pipe(first());
  }

  updateTodo(
    params: ITodoRequest,
    id: string | number
  ): Observable<ITodoResponse> {
    return this.#http
      .put<ITodoResponse>(CApiResources.TodoEndpoint.updateTodo(id), params)
      .pipe(first());
  }
}
