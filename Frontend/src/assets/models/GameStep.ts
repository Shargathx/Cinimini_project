import type { Discussion } from "./Discussion";
import type { Media } from "./Media";
import type { Question } from "./Question";
import type { TeacherText } from "./TeacherText";

export interface GameStep {
    stepId?: number;
    discussionPoints: Discussion[];
    questions: Question[];
    teacherTexts: TeacherText[];
    mediaElements: Media[];
}