type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageExposure({ value, onChange }: Props) {
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
                Särisus: {value}%
            </label>

            <input
                className="image-slider"
                type="range"
                min="0"
                max="200"
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
            />
        </div>
    );
}

export default ImageExposure;