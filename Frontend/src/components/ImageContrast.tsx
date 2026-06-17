type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageContrast({ value, onChange }: Props) {
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
                Kontrast: {value}%
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

export default ImageContrast;