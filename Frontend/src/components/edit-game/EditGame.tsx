interface Question {
    questionText: string;
}

interface DiscussionPoint {
    discussionText: string;
}

interface TeacherText {
    teacherText: string;
}

interface Step {
    questions: Question[];
    discussionPoints: DiscussionPoint[];
    teacherTexts: TeacherText[];
    images?: File[];
}

async function EditGame(name: string,category: string,description: string,steps: Step[]): Promise<void> {
    const formData = new FormData();

    const gameData = {
        name,
        categoryId: category,
        description,
        steps: steps.map((step) => ({
            questions: step.questions.map((q) => ({
                questionText: q.questionText,
            })),
            discussionPoints: step.discussionPoints.map((dp) => ({
                discussionText: dp.discussionText,
            })),
            teacherTexts: step.teacherTexts.map((tt) => ({
                teacherText: tt.teacherText,
            })),
        })),
    };

    formData.append("gameRequest", JSON.stringify(gameData));

    steps.forEach((step, stepIndex) => {
        step.images?.forEach((file: File) => {
            formData.append(`steps[${stepIndex}].image`, file);
        });
    });

    for (const [key, value] of formData.entries()) {
        console.log(key, value);
    }

    const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/games/add-game`,
        {
            method: "PATCH",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Failed to save game");
    }

    alert("Game saved!");
}

export default EditGame;