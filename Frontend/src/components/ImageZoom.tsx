type Props = {
    value: number;
    onChange: (value: number) => void;
};

function ImageZoom({ value, onChange }: Props) {
    return (
        <div className="slider-control">
            <label>Zoom: {value}%</label>

            <input
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