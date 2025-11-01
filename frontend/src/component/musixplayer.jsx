import React, { useEffect, useRef, useState } from "react";
import { SongData } from "../context/Songcontext";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";

const Musixplayer = () => {
  // Get data + functions from context
  const {
    singlesong,        // The current playing song details
    getSinglesong,     // Function to fetch selected song data
    selectedsong,      // The song ID selected from the list
    isplaying,         // Boolean → is song currently playing
    setIsplaying,      // Function to toggle play/pause
    
    song ,        // Array of all songs (for next/previous)
    setSelectedSong,   // Function to change selected song
  } = SongData();

  // Reference to <audio> element (to control playback)
  const audioRef = useRef(null);

  // Track playback progress and total duration
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch the selected song whenever `selectedsong` changes
  useEffect(() => {
    if (selectedsong) getSinglesong();
  }, [selectedsong]);

  // Set up event listeners for audio progress updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // When song metadata (like duration) loads
    const handleLoadedMetaData = () => {
      setDuration(audio.duration); // total length of song in seconds
    };

    // When song time updates (each second while playing)
    const handleTimeUpdate = () => {
      setProgress(audio.currentTime); // update current playback time
    };

    // Attach event listeners
    audio.addEventListener("loadedmetadata", handleLoadedMetaData);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    // Cleanup → remove listeners when song changes/unmounts
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetaData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [singlesong]);

  // ▶️ Play or ⏸ Pause
  const handlePlayPause = () => {
    if (isplaying) {
      audioRef.current.pause();  // pause audio
    } else {
      audioRef.current.play();   // play audio
    }
    setIsplaying(!isplaying);     // toggle play/pause state
  };

  // 🎚 Seek progress manually (when dragging progress bar)
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration; // convert % → seconds
    audioRef.current.currentTime = newTime;            // set new position
    setProgress(newTime);                              // update progress state
  };

 // ⏭ Go to next song
const handleNext = () => {
  if (!song || song.length === 0) return;
  const currentIndex = song.findIndex((s) => s._id === selectedsong);
  const nextIndex = (currentIndex + 1) % song.length; // loop to first
  setSelectedSong(song[nextIndex]._id);
};

// ⏮ Go to previous song
const handlePrev = () => {
  if (!song || song.length === 0) return;
  const currentIndex = song.findIndex((s) => s._id === selectedsong);
  const prevIndex = (currentIndex - 1 + song.length) % song.length; // wrap to last
  setSelectedSong(song[prevIndex]._id);
};


// Volume Increse and Descrese 

  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  // 🕳 Don't render anything if no song selected yet
  if (!singlesong) return null;

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      {/* 🎵 Song info section */}
      <div className="flex items-center gap-4">
        <img
          src={singlesong.thumbnail?.url || "https://via.placeholder.com/50"}
          className="w-12 h-12 rounded"
          alt={singlesong.title}
        />
        <div className="hidden md:block">
          <p className="font-semibold">{singlesong.title}</p>
          <p className="text-sm text-gray-400">
            {singlesong.description?.slice(0, 30)}...
          </p>
        </div>
      </div>

      {/* 🎧 Main player controls */}
      <div className="flex flex-col items-center gap-2 m-auto">
        {/* Hidden audio element (actual sound playing here) */}
        <audio
          ref={audioRef}
          src={singlesong.audio?.url || ""}
          autoPlay={isplaying} // automatically plays if isplaying = true
        />

        {/* Progress bar (shows how much song played) */}
        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (progress / duration) * 100 : 0} // percentage
          onChange={handleProgressChange}                    // allow user seek
          className="progress-bar w-[120px] md:w-[300px] cursor-pointer"
        />

        {/* ⏮ ⏯ ⏭ buttons */}
        <div className="flex justify-center items-center gap-4 mt-2">
          <span className="cursor-pointer" onClick={handlePrev}>
            <GrChapterPrevious />
          </span>

          <button
            className="bg-white text-black rounded-full p-2"
            onClick={handlePlayPause}
          >
            {isplaying ? <FaPause /> : <FaPlay />}
          </button>

          <span className="cursor-pointer" onClick={handleNext}>
            <GrChapterNext />
          </span>
        </div>


        
      </div>
      {/* Volume increse &  descrese */}
      <div className="flex items-center gap-1">
        <p>Volume</p>
            <input
              type="range"
              className="w-16 md:w-32"
              min={"0"}
              max={"1"}
              step={"0.01"}
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
    </div>
  );
};

export default Musixplayer;
