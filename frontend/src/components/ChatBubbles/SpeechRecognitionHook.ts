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
    }, []);
    
    const startListening = () => {
        setIsListening(true);
        recognition.start();
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
        hasRecognitionSupport: !!recognition
    }

};

export default useSpeechRecognition;