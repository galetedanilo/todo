import { TTodoStatus } from "../types";

export interface ITodoResponse {
    id: string | number;
    title: string;
    description: string;
    status: TTodoStatus;
}