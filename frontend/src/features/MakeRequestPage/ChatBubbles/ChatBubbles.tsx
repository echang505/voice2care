import React from "react";
import useSpeechRecognition from "./SpeechRecognitionHook";

const ChatBubbles: React.FC = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
  } = useSpeechRecognition();

  if (!hasRecognitionSupport) {
    return <h1>Your browser does not support speech recognition.</h1>;
  }

  return (
    <>
      <label className="block text-sm font-medium text-gray-700">
        Select Microphone:
      </label>
      <select
        className="border p-2 rounded"
        value={selectedDeviceId}
        onChange={(e) => setSelectedDeviceId(e.target.value)}
      >
        <option value="">Default</option>
        {devices.map((device) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone (${device.deviceId.slice(0, 6)}...)`}
          </option>
        ))}
      </select>
      
      <div>
        <button onClick={startListening}>
          Start Recording
        </button>
      </div>

      <div>
        <button onClick={stopListening}>
          Stop Recording
        </button>
      </div>

      {isListening && <div>Recording...</div>}
      {text && <p>{text}</p>}
    </>
  );
};

export default ChatBubbles;
