type QuestionManagerProps = {
    value: string;
    questions: {
        id: number;
        questionText: string;
    }[];
    onInputChange: (value: string) => void;
    onAdd: () => void;
    onDelete: (id: number) => void;
};
import "../../assets/pages/AddGame.css";

export default function QuestionManager({
    value,
    questions,
    onInputChange,
    onAdd,
    onDelete
}: QuestionManagerProps) {
    return (
        <>
            <h3 id="addQuestionTitle">Lisa küsimus</h3>

            <input id="addQuestion"
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />

            <button id="addQuestionBtn" type="button" onClick={onAdd}>
                Lisa küsimus
            </button>

            <div>Küsimused:</div>

            {questions.map(question => (
                <div key={question.id}>
                    {question.questionText}

                    <button
                        type="button"
                        onClick={() => onDelete(question.id)}
                    >
                        Kustuta
                    </button>
                </div>
            ))}
        </>
    );
}