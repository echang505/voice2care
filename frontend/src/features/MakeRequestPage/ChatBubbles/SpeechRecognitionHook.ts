import { useEffect, useState } from "react";

let recognition: any = null;
if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

    // set up devices
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const mediaDevices = await navigator.mediaDevices.enumerateDevices();
                const audioInputDevices = mediaDevices.filter(device => device.kind === "audioinput");
                setDevices(audioInputDevices);
                if (audioInputDevices.length > 0) {
                    setSelectedDeviceId(audioInputDevices[0].deviceId);
                }
            } catch (error) {
                console.error("Error fetching devices: ", error);
            }
        };

        fetchDevices();
    }, []);

    // set up recognition
    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            console.log("onresult event: ", event);
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                if (result.isFinal) {
                    const newTranscript = result[0].transcript;
                    setText(prevText => prevText + ' ' + newTranscript);
                }
            }
        };
        recognition.onstart = () => console.log("Speech recognition started");
        recognition.onerror = (e: Error) => console.error("Speech recognition error: ", e);
        recognition.onend = () => console.log("Speech recognition ended");
    }, []);
    
    const startListening = async () => {
        try {
            const constraints = selectedDeviceId
            ? { audio: { deviceId: { exact: selectedDeviceId } } }
            : { audio: true };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            stream.getTracks().forEach((track) => track.stop()); // Just to prime mic
            setIsListening(true);
            recognition.start();
        } catch (error) {
            console.error("Error starting speech recognition: ", error);
            setIsListening(false);
        }

    };
    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport: !!recognition,
        devices, 
        selectedDeviceId,
        setSelectedDeviceId,
    }

};

export default useSpeechRecognition;