import React, { useReducer, useRef, useState } from "react";
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

const VideoPlayer = ({ media }) => {
  const videoTag = useRef();
  const [mute, setMute] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleclick = () => {
    if (isPlaying) {
      videoTag.current.pause();
      setIsPlaying(false);
    } else {
      videoTag.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden">
      <video
        ref={videoTag}
        src={media}
        autoPlay
        loop
        muted = {mute}
        className="h-[100%] cursor-pointer w-full object-cover rounded-2xl "
        onClick={handleclick}
      />
      <div className="absolute bottom-[10px] right-[10px] " onClick={()=>setMute(prev=>!prev)}>
        {!mute ? (
          <FiVolume2 className="w-[20px] h-[20px] text-white font-semibold" />
        ) : (
          <FiVolumeX className="w-[20px] h-[20px] text-white font-semibold" />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
