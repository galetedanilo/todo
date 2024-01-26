import { TTodoStatus } from '../types';

export interface ITodoRequest {
  title: string;
  description: string;
  status: TTodoStatus;
}
