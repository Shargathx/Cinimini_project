import type { GameStep } from "./GameStep";

export interface Game {
    gameId: number;
    name: string;
    categoryId: number;
    description: string;
    gameSteps: GameStep[];
}