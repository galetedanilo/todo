import { TTodosCallState } from '../types';

export function setLoading(): { callState: TTodosCallState } {
  return { callState: 'loading' };
}

export function setLoaded(): { callState: TTodosCallState } {
  return { callState: 'loaded' };
}

export function setError(error: string): { callState: TTodosCallState } {
  return { callState: { error } };
}
