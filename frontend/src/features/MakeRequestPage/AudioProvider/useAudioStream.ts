import { useEffect, useRef, useState } from 'react';
import { GoogleGenAI, Modality, Session, LiveServerMessage } from '@google/genai';
import { createBlob } from './audioProviderUtils'; // your helper for PCM -> Blob

export const useAudioStream = () => {
    const [transcript, setTranscript] = useState('');
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>('');

    const inputAudioContext = useRef(new AudioContext({ sampleRate: 16000 }));
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const sessionRef = useRef<Session | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const [status, setStatus] = useState('');
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const audioInputs = devices.filter(d => d.kind === 'audioinput');
                setDevices(audioInputs);
                if (audioInputs.length > 0) setSelectedDeviceId(audioInputs[0].deviceId);
            } catch (e) {
                console.error('Device fetch error:', e);
            }
        };
        fetchDevices();
    }, []);

    const initSession = async () => {
        try {
            const res = await fetch('/api/getGeminiLiveKey');
            if (!res.ok) {
                throw new Error('Failed to fetch Gemini Live Key');
            }
            const apiKey = await res.json();
            console.log('Gemini Live Key:', apiKey);
            const client = new GoogleGenAI({ apiKey: apiKey });
            sessionRef.current = await client.live.connect({
                model: 'gemini-2.5-flash-preview-native-audio-dialog',
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: {
                        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Orus' } },
                    },
                },
                callbacks: {
                    onopen: () => setStatus('Session opened'),
                    onmessage: async (msg: LiveServerMessage) => {
                    const audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData;

                    if (audio && audio.data) {
                        const raw = Uint8Array.from(atob(audio.data), c => c.charCodeAt(0));
                        const audioContext = new AudioContext({ sampleRate: 24000 });

                        try {
                        console.log(raw.buffer);
                        const buffer = await audioContext.decodeAudioData(raw.buffer);
                        const source = audioContext.createBufferSource();
                        source.buffer = buffer;
                        source.connect(audioContext.destination);
                        source.start();
                        } catch (err) {
                        console.error('Decoding error:', err);
                        }
                    }
                    },
                    onerror: (e) => console.error('Session error:', e),
                    onclose: (e) => setStatus(`Session closed: ${e.reason}`),
                },
            });
        } catch (err) {
            console.error('Error initializing session:', err);
            setStatus('Error: ' + (err instanceof Error ? err.message : String(err)));
        }
  };

    const startStreaming = async () => {
        if (isRecording) return;

        await inputAudioContext.current.resume();

        try {
            await initSession();

            const stream = await navigator.mediaDevices.getUserMedia({
                audio: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined },
            });

            mediaStreamRef.current = stream;

            const sourceNode = inputAudioContext.current.createMediaStreamSource(stream);
            sourceNodeRef.current = sourceNode;

            const processor = inputAudioContext.current.createScriptProcessor(256, 1, 1);
            scriptProcessorRef.current = processor;

            processor.onaudioprocess = (event) => {
                const pcmData = event.inputBuffer.getChannelData(0);
                sessionRef.current?.sendRealtimeInput({ media: createBlob(pcmData) });
            };

            sourceNode.connect(processor);
            processor.connect(inputAudioContext.current.destination);

            setIsRecording(true);
            setStatus('🔴 Recording...');
        } catch (err) {
            console.error('Error starting Gemini stream:', err);
            if (err instanceof Error) {
                setStatus('Error: ' + err.message);
            } else {
                setStatus('Error: ' + String(err));
            }
            stopStreaming();
        }
    };

    const stopStreaming = () => {
        setIsRecording(false);
        scriptProcessorRef.current?.disconnect();
        sourceNodeRef.current?.disconnect();
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());

        sessionRef.current?.close();

        scriptProcessorRef.current = null;
        sourceNodeRef.current = null;
        mediaStreamRef.current = null;
        sessionRef.current = null;

        setStatus('Recording stopped');
    };

    return {
        startStreaming,
        stopStreaming,
        transcript,
        status,
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
    };
};