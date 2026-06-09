type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageExposure({ value, onChange }: Props) {
    return (
        <div>
            <label
                style={{
                    display: "inline-block",
                    width: "160px",
                    fontVariantNumeric: "tabular-nums"
                }}
            >
                Exposure: {value}%
            </label>

            <input
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