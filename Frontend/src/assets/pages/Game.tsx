import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './Game.css';
import type { Game } from '../models/Game'
import type { Question } from '../models/Question'
import type { Discussion } from '../models/Discussion'
import ImageSaturation from '../../components/ImageSaturation';
import ImageContrast from '../../components/ImageContrast';
import ImageExposure from '../../components/ImageExposure';
import ImageZoom from '../../components/ImageZoom';


function Game() {

    //Praegu veel "barebones"

    const [saturation, setSaturation] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [exposure, setExposure] = useState(100);
    const [zoom, setZoom] = useState(100);

    const { id } = useParams()
    const { catid } = useParams() // TODO: on vaja?
    const [data, setData] = useState<Game | null>(null)
    const [questions, setQuestions] = useState<Question[]>([])
    const [points, setPoints] = useState<Discussion[]>([])
    const [reverb, setReverb] = useState<number>(0)
    const [speed, setSpeed] = useState<number>(1)
    // const [img, setImg] = useState<string>("")
    // const [toggle, setToggle] = useState(false)
    const media = data?.gameSteps[0]?.mediaElements?.[0]?.fileData ?? ""
    const fileFormat = data?.gameSteps[0]?.mediaElements?.[0]?.mediaType ?? ""

    useEffect(() => {
        fetch(import.meta.env.VITE_BACK_URL + `/category/games/${id}/steps`)
            .then(res => res.json())
            .then(json => { setData(json) })
            .catch(err => console.error(err));
    }, [id])

    function returnCorrectData() {
        console.log(fileFormat);
        switch (fileFormat) {
            case "image/png":

                return (
                    media && (
                        <img
                            src={`data:image/png;base64,${media}`}
                            alt="Game"
                            style={{
                                filter: `
                        saturate(${saturation}%)
                        contrast(${contrast}%)
                        brightness(${exposure}%)
                    `,
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "center"
                            }}
                        />
                    )
                );
            case "audio/mpeg":
                async function playReversed(url: string) {
                    const audioContext = new AudioContext();

                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();

                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                    // Reverse each channel
                    for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                        audioBuffer.getChannelData(channel).reverse();
                    }

                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(audioContext.destination);

                    source.start();
                }
                async function playWithReverb(url: string) {
                    const audioContext = new AudioContext();

                    const response = await fetch(url);
                    const arrayBuffer = await response.arrayBuffer();

                    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

                    // Source
                    const source = audioContext.createBufferSource();
                    source.buffer = audioBuffer;

                    // Reverb
                    const convolver = audioContext.createConvolver();
                    convolver.buffer = createImpulseResponse(audioContext, 3, 4);

                    // Dry/Wet mix
                    const dryGain = audioContext.createGain();
                    const wetGain = audioContext.createGain();

                    dryGain.gain.value = 0.7; // original audio
                    wetGain.gain.value = reverb; // reverb amount

                    // Connections
                    source.connect(dryGain);
                    source.connect(convolver);

                    convolver.connect(wetGain);

                    dryGain.connect(audioContext.destination);
                    wetGain.connect(audioContext.destination);

                    source.start();

                    function createImpulseResponse(context: AudioContext, duration = 3, decay = 4) {
                        const length = context.sampleRate * duration;
                        const impulse = context.createBuffer(
                            2,
                            length,
                            context.sampleRate
                        );

                        for (let channel = 0; channel < 2; channel++) {
                            const data = impulse.getChannelData(channel);

                            for (let i = 0; i < length; i++) {
                                data[i] =
                                    (Math.random() * 2 - 1) *
                                    Math.pow(1 - i / length, decay);
                            }
                        }

                        return impulse;
                    }




                }
                return (
                    media && (<>
                        <audio controls>
                            <source src={`data:audio/mpeg;base64,${media}`} type="audio/mpeg"
                            />
                        </audio>
                        <button onClick={() => { playReversed(`data:audio/mpeg;base64,${media}`) }}>Reversed</button>
                        <button onClick={() => { playWithReverb(`data:audio/mpeg;base64,${media}`) }}>Reverb</button>
                        {changeReverb()}
                    </>

                    )
                )
            case "video/mp4":
                const video: HTMLVideoElement = document.getElementById("video");
                let reverseInterval: number;

                function playReverse() {
                    clearInterval(reverseInterval);
                    video!.pause()
                    reverseInterval = setInterval(() => {
                        if (video?.currentTime <= 0) {
                            video?.pause()
                            clearInterval(reverseInterval);
                            return;
                        }

                        video!.currentTime -= 0.04 * speed; // ~25fps
                    }, 40);
                }

                function playFast() {
                    video!.defaultPlaybackRate = speed;
                    video!.load()
                    video!.play()
                }

                return (
                    media && (<>
                        <video id='video' width="320" height="240" controls>
                            <source src={`data:video/mp4;base64,${media}`} type="video/mp4"></source>
                        </video><br></br>
                        <button onClick={() => { playReverse() }}>Reverse</button>
                        <button onClick={() => { playFast() }}>Fast</button>
                        {changeSpeed()}
                    </>
                    )
                );

        }
    }

    type Props = {
        value: number;
        onChange: (value: number) => void;
    };

    function changeReverb() {
        return (
            <div>
                <label
                    style={{
                        display: "inline-block",
                        width: "160px",
                        fontVariantNumeric: "tabular-nums"
                    }}
                >
                    Reverb amount: {reverb}%
                </label>

                <input
                    type="range"
                    min="0"
                    max="100"
                    value={reverb}
                    onChange={(e) => setReverb(Number(e.target.value))}
                />
            </div>
        );
    }

    function changeSpeed() {
        return (
            <div>
                <label
                    style={{
                        display: "inline-block",
                        width: "160px",
                        fontVariantNumeric: "tabular-nums"
                    }}
                >
                    Speed amount: {speed}<br></br><br></br>
                </label>

                <input
                    type="range"
                    min="1"
                    max="2"
                    step=".1"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                />
            </div>
        );
    }


    function getQuestions() {
        if (data) {
            setQuestions(data.gameSteps[0].questions)
        }
    }

    function getPoints() {
        if (data) {
            setPoints(data.gameSteps[0].discussionPoints)
        }
    }

    return (<>

        {returnCorrectData()}

        {fileFormat.startsWith("image/") && (
            <>
                <ImageSaturation
                    value={saturation}
                    onChange={setSaturation}
                />

                <ImageContrast
                    value={contrast}
                    onChange={setContrast}
                />

                <ImageExposure
                    value={exposure}
                    onChange={setExposure}
                />

                <ImageZoom
                    value={zoom}
                    onChange={setZoom}
                />
            </>
        )}

        <h1>Mängu nimi: {data?.name}</h1>
        <h3>Kirjeldus: {data?.description}</h3>
        <button onClick={() => { getQuestions() }}>Questions</button>
        <div>Küsimused: </div>
        {questions.map((question) => (
            <div key={question.id}>{question.questionText}</div>
        ))}

        <button onClick={() => { getPoints() }}>Discussion points</button>
        <div>Arutelu punktid: </div>
        {points.map((point) => (
            <div key={point.id}>{point.discussionText}</div>
        ))}
    </>
    )
}

export default Game
