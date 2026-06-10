type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageSaturation({ value, onChange }: Props) {
    return (
        <div className="slider-control">
            <label>Saturation: {value}%</label>

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

export default ImageSaturation;