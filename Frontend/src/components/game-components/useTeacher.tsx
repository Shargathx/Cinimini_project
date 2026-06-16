type TeacherTextManagerProps = {
    value: string;
    texts: {
        id: number;
        teacherText: string;
    }[];
    onInputChange: (value: string) => void;
    onAdd: () => void;
    onDelete: (id: number) => void;
};

export default function TeacherTextManager({
    value,
    texts,
    onInputChange,
    onAdd,
    onDelete
}: TeacherTextManagerProps) {
    return (
        <>
            <h3 id="addTeacherTextTitle">Õpetaja tekst</h3>

            <input id="addTeachText"
                value={value}
                onChange={(e) => onInputChange(e.target.value)}
            />

            <button id="addTeachTextBtn"  type="button" onClick={onAdd}>
                Lisa õpetaja tekst
            </button>

            <div>Õpetaja tekstid:</div>

            {texts.map(text => (
                <div key={text.id}>
                    {text.teacherText}

                    <button id="eraseBtn"
                        type="button"
                        onClick={() => onDelete(text.id)}
                    >
                        Kustuta
                    </button>
                </div>
            ))}
        </>
    );
}