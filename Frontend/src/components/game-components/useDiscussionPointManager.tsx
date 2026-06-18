type DiscussionPointManagerProps = {
  value: string;
  points: {
    id?: number;
    discussionText: string;
  }[];
  onInputChange: (value: string) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
};

export default function DiscussionPointManager({
  value,
  points,
  onInputChange,
  onAdd,
  onDelete
}: DiscussionPointManagerProps) {
  return (
    <>
      <h3 id="addDiscussionTitle">Lisa arutelupunkt</h3>

      <input id="addDiscussion"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />

      <button id="addDiscussionBtn" type="button" onClick={onAdd}>
        Lisa arutelupunkt
      </button>

      <div>Arutelu punktid:</div>

      {points.map(point => (
        <div key={point.id}>
          {point.discussionText}

          <button
            id="eraseBtn"
            type="button"
            onClick={() => onDelete(Number(point.id))}
          >
            x
          </button>
        </div>
      ))}
    </>
  );
}