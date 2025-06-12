import { useRef, useState, useEffect } from 'react';

export const useAudioStream = () => {
    const [transcript, setTranscript] = useState('');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

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


    const startStreaming = async () => {
        try {
            // const stream = await navigator.mediaDevices.getUserMedia({
            //     audio: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }
            // });

            // const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            // mediaRecorderRef.current = mediaRecorder;

            const socket = new WebSocket('ws://' + window.location.host + '/api/');
            console.log('Connecting to WebSocket:', socket);
            socketRef.current = socket;

            socket.onopen = () => {
                // mediaRecorder.start(250); // Send audio chunks every 250ms
                // mediaRecorder.ondataavailable = (event) => {
                //     if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
                //         socket.send(event.data);
                //     }
                // };
                console.log('WebSocket is open:', socket.readyState === WebSocket.OPEN); // true
                
                if (socket.readyState === WebSocket.OPEN) {
                    console.log("hi");
                    socket.send(JSON.stringify({ action: 'start' }));
                }
            };

            socket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.transcript) {
                    setTranscript((prev) => prev + ' ' + message.transcript);
                }
            };

            socket.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            socket.onclose = () => {
                console.log('WebSocket connection closed');
            };
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopStreaming = () => {
        // mediaRecorderRef.current?.stop();
        socketRef.current?.close();
    };

    return {
        startStreaming, 
        stopStreaming, 
        transcript, 
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
    };
};