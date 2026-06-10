type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageExposure({ value, onChange }: Props) {
    return (
        <div className="slider-control">
            <label>Exposure: {value}%</label>

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