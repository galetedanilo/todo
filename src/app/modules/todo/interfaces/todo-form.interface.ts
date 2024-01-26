import { FormControl } from '@angular/forms';
import { TTodoStatus } from '../types';

export interface ITodoForm {
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  description: FormControl<string | null>;
  status: FormControl<TTodoStatus | null>;
}
