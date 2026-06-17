interface UseAudioControlsProps {
    reverb: number;
}

export function useAudioController({
    reverb,
}: UseAudioControlsProps) {

    function createImpulseResponse(
        context: AudioContext,
        duration = 3,
        decay = 4
    ) {
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

    async function playReversed(url: string) {
        const audioContext = new AudioContext();

        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        const audioBuffer =
            await audioContext.decodeAudioData(arrayBuffer);

        for (
            let channel = 0;
            channel < audioBuffer.numberOfChannels;
            channel++
        ) {
            audioBuffer.getChannelData(channel).reverse();
        }

        const source =
            audioContext.createBufferSource();

        source.buffer = audioBuffer;
        source.connect(audioContext.destination);
        source.start();
    }

    async function playWithReverb(url: string) {
        const audioContext = new AudioContext();

        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();

        const audioBuffer =
            await audioContext.decodeAudioData(arrayBuffer);

        const source =
            audioContext.createBufferSource();

        source.buffer = audioBuffer;

        const convolver =
            audioContext.createConvolver();

        convolver.buffer =
            createImpulseResponse(audioContext, 3, 4);

        const dryGain =
            audioContext.createGain();

        const wetGain =
            audioContext.createGain();

        dryGain.gain.value = 0.7;
        wetGain.gain.value = reverb / 100;

        source.connect(dryGain);
        source.connect(convolver);

        convolver.connect(wetGain);

        dryGain.connect(audioContext.destination);
        wetGain.connect(audioContext.destination);

        source.start();
    }

    return {
        playReversed,
        playWithReverb,
    };
}