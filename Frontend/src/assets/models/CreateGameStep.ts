import type { Discussion } from "./Discussion";
import type { Question } from "./Question";

export interface CreateGameStep {
    image: File | null;
    questions: Question[];
    discussionPoints: Discussion[];
}