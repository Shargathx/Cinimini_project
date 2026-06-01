import type { CreateGameStep } from "./CreateGameStep";

export interface CreateGameRequest {
    name: string;
    categoryId: number;
    description: string;
    steps: CreateGameStep[];
}