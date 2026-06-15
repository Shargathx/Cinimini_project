import type { Discussion } from "./Discussion";
import type { Question } from "./Question";
import type { TeacherText } from "./TeacherText";

export interface CreateGameStep {
    id: string;
    images: [];
    questions: Question[];
    discussionPoints: Discussion[];
    teacherTexts: TeacherText[];
    questionInput: string,
    discussionInput: string,
    teacherTextInput:string
}