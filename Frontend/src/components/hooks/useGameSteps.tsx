import { useState } from "react";
import type { CreateGameStep } from "../../assets/models/CreateGameStep";

export function useGameSteps() {
    const [questionCounter, setQuestionCounter] = useState(0);
    const [discussionPointsCounter, setDiscussionPointsCounter] = useState(0);
    const [teacherTextCounter, setTeacherTextCounter] = useState(0);

    function createEmptyStep(): CreateGameStep {
        return {
            id: undefined,
            images: [],
            questions: [],
            discussionPoints: [],
            teacherTexts: [],
            questionInput: "",
            discussionInput: "",
            teacherTextInput: ""
        };
    }
    const [steps, setSteps] = useState<CreateGameStep[]>([
        createEmptyStep()
    ]);

    function addStep() {
        setSteps(prev => [...prev, createEmptyStep()]);
    }


    function deleteStep(stepIndex: number) {
        setSteps(prev =>
            prev.filter((_, index) => index !== stepIndex)
        );
    }

    function updateQuestionInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? { ...step, questionInput: value }
                    : step
            )
        );
    }

    function updateDiscussionInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? { ...step, discussionInput: value }
                    : step
            )
        );
    }

    function addQuestion(stepIndex: number) {
        const questionText =
            steps[stepIndex].questionInput.trim();

        if (!questionText) return;

        const newId = questionCounter + 1;
        setQuestionCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questionInput: "",
                        questions: [
                            ...step.questions,
                            {
                                id: newId,
                                questionText
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function addQuestionEdit(stepIndex: number) {
        const questionText =
            steps[stepIndex].questionInput.trim();

        if (!questionText) return;

        const newId = questionCounter + 1;
        setQuestionCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questionInput: "",
                        questions: [
                            ...step.questions,
                            {
                                questionText
                            }
                        ]
                    }
                    : step
            )
        );
    }
    function updateTeacherTextInput(
        stepIndex: number,
        value: string
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTextInput: value
                    }
                    : step
            )
        );
    }

    function addTeacherText(stepIndex: number) {
        const text =
            steps[stepIndex].teacherTextInput.trim();

        if (!text) return;

        const newId = teacherTextCounter + 1;
        setTeacherTextCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTextInput: "",

                        teacherTexts: [
                            ...step.teacherTexts,
                            {
                                id: newId,
                                teacherText: text
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function addTeacherTextEdit(stepIndex: number) {
        const text =
            steps[stepIndex].teacherTextInput.trim();

        if (!text) return;

        const newId = teacherTextCounter + 1;
        setTeacherTextCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        teacherTextInput: "",

                        teacherTexts: [
                            ...step.teacherTexts,
                            {
                                teacherText: text
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function deleteTeacherText(
        stepIndex: number,
        teacherTextId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex ? {
                    ...step, teacherTexts: step.teacherTexts.filter(
                        t => t.id !== teacherTextId
                    )
                }
                    : step
            )
        );
    }

    function deleteQuestion(
        stepIndex: number,
        questionId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        questions: step.questions.filter(
                            q => q.id !== questionId
                        )
                    }
                    : step
            )
        );
    }

    function addDiscussionPoint(
        stepIndex: number
    ) {
        const discussionText =
            steps[stepIndex].discussionInput.trim();

        if (!discussionText) return;

        const newId = discussionPointsCounter + 1;
        setDiscussionPointsCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionInput: "",
                        discussionPoints: [
                            ...step.discussionPoints,
                            {
                                id: newId,
                                discussionText
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function addDiscussionPointEdit(
        stepIndex: number
    ) {
        const discussionText =
            steps[stepIndex].discussionInput.trim();

        if (!discussionText) return;

        const newId = discussionPointsCounter + 1;
        setDiscussionPointsCounter(newId);

        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionInput: "",
                        discussionPoints: [
                            ...step.discussionPoints,
                            {
                                discussionText
                            }
                        ]
                    }
                    : step
            )
        );
    }

    function deletePoint(
        stepIndex: number,
        pointId: number
    ) {
        setSteps(prev =>
            prev.map((step, index) =>
                index === stepIndex
                    ? {
                        ...step,
                        discussionPoints: step.discussionPoints.filter(
                            p => p.id !== pointId
                        )
                    }
                    : step
            )
        );
    }



    // move all your other functions here...

    return {
        steps,
        setSteps,

        addStep,
        deleteStep,

        addQuestion,
        deleteQuestion,
        updateQuestionInput,
        addQuestionEdit,

        addDiscussionPoint,
        deletePoint,
        updateDiscussionInput,
        addDiscussionPointEdit,

        addTeacherText,
        deleteTeacherText,
        updateTeacherTextInput,
        addTeacherTextEdit
    };
}