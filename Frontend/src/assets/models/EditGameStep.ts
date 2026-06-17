export interface EditGameStep {
    id?: number;
    images: File[];
    questions: {
        id?: number,
        questionText: string
    }[];
    discussionPoints: {
        id?: number,
        discussionText: string
    }[];
    teacherTexts: {
        id?: number,
        teacherText: string
    }[];
    questionInput: string;
    discussionInput: string;
    teacherTextInput: string;
}