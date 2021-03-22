import { State } from './state';

export interface Country {
    id: number;
    code: string;
    name: string;
    states: State[];
}
