import type { Discussion } from "./Discussion";
import type { Media } from "./Media";
import type { Question } from "./Question";

export interface GameStep {
    stepId: number;
    discussionPoints: Discussion[];
    questions: Question[];
    media: Media[];
}