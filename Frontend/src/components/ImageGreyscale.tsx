import { useState } from "react";

type Props = {
    imageData: string;
};

function ImageGreyscale({ imageData }: Props) {
    const [saturation, setSaturation] = useState(100);

    return (
        <div>
            <img
                src={`data:image/png;base64,${imageData}`}
                alt="Game"
                style={{
                    maxWidth: "100%",
                    filter: `saturate(${saturation}%)`
                }}
            />

            <div>
                <label>
                    Saturation: {saturation}%
                </label>
                <input
                    type="range"
                    min="0"
                    max="200"
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                />
            </div>
        </div>
    );
}

export default ImageGreyscale;