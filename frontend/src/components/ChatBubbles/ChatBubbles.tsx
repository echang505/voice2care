import React from "react";
import useSpeechRecognition from "./SpeechRecognitionHook";

const ChatBubbles: React.FC = () => {
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  if (!hasRecognitionSupport) {
    return <h1>Your browser does not support speech recognition.</h1>;
  }

  return (
    <div>
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
    </div>
  );
};

export default ChatBubbles;
