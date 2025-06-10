import React, { useState } from 'react';
import { useAudioStream } from './useAudioStream';

const AudioProvider: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { startStreaming, stopStreaming, transcript, devices, selectedDeviceId, setSelectedDeviceId } = useAudioStream();

  const handleStart = async () => {
    setIsRecording(true);
    await startStreaming();
  };

  const handleStop = () => {
    setIsRecording(false);
    stopStreaming();
  };

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
      <button onClick={isRecording ? handleStop : handleStart}>
        {isRecording ? 'Stop Conversation' : 'Start Conversation'}
      </button>
      <div>
        <h3>Live Transcript:</h3>
        <p>{transcript}</p>
      </div>
    </div>
    </>
    
  );
};

export default AudioProvider;