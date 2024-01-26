import { TTodoStatus } from '../types';

export interface ITodoSubmit {
  id: string | number;
  title: string;
  description: string;
  status: TTodoStatus;
}
