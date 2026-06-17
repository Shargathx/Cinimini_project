type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageZoom({ value, onChange }: Props) {
    return (
        <div className="text-and-slider">
            <label
                className="image-slider-text"
                style={{
                    display: "inline-block",
                    width: "160px",
                    fontVariantNumeric: "tabular-nums"
                }}
            >
                Suurendamine: {value}%
            </label>

            <input
                className="image-slider"
                type="range"
                min="0"
                max="500"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}

export default ImageZoom;