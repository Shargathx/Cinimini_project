import type { GameStep } from "./GameStep";

export interface Game {
    id: number;
    name: string;
    categoryId: number;
    description: string;
    gameSteps: GameStep[];
}