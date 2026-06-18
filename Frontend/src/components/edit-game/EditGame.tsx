interface Question {
    id?: number;
    questionText: string;
}

interface DiscussionPoint {
    id?: number;
    discussionText: string;
}

interface TeacherText {
    id?: number;
    teacherText: string;
}

interface Step {
    id?: number;
    questions: Question[];
    discussionPoints: DiscussionPoint[];
    teacherTexts: TeacherText[];
    images?: File[];
}

async function EditGame(
    gameId: string,
    name: string,
    category: string,
    description: string,
    steps: Step[]
): Promise<void> {
    const formData = new FormData();

    const gameRequest = {
        name,
        categoryId: Number(category),
        description,
        steps: (steps || []).map(step => ({
            stepRequestId: step.id ?? null,

            questions: (step.questions || []).map(q => ({
                id: q.id ?? null, // Preserves Question ID
                questionText: q.questionText,
            })),

            discussionPoints: (step.discussionPoints || []).map(dp => ({
                id: dp.id ?? null, // Preserves DiscussionPoint ID
                discussionText: dp.discussionText,
            })),

            teacherTexts: (step.teacherTexts || []).map(tt => ({
                id: tt.id ?? null   , // Preserves TeacherText ID
                teacherText: tt.teacherText,
            })),
        })),
    };

    console.log("PAYLOAD BEING SENT:", JSON.stringify(gameRequest, null, 2));

    formData.append(
        "updateGameRequest",
        new Blob([JSON.stringify(gameRequest)], {
            type: "application/json",
        })
    );

    steps.forEach((step, index) => {
        step.images?.forEach(file => {
            formData.append(`steps[${index}].image`, file);
        });
    });

    const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/games/edit-game/${gameId}`,
        {
            method: "PATCH",
            body: formData,
        }
    );

if (!response.ok) {
    const error = await response.text();

    console.log("BACKEND ERROR:", error);

    throw new Error(error);
}
    else {
        window.location.reload()
    }

    alert("Game updated!");
}

export default EditGame;