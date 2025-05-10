import { useEffect, useRef, useState } from "react";

const BG_COLOR = "#0e0e0e";
const AUDIO_SRC = "/Fear.mp3";
const COVER_URL = "https://www.dochord.com/wp-content/uploads/2025/04/PURPEECH-1.webp";

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default function App() {
  // Music Player State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(29); // fallback: 29s only

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setCurrentTime(val);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start relative" style={{ background: BG_COLOR }}>
      <StarBackground />
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg mt-8 glow-card py-8 px-4">
        {/* Profile section */}
        <img
          src="https://i.imgur.com/nrGY7g5.jpeg"
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-neutral-900 object-cover shadow-lg mb-4 mt-[-64px]"
          style={{ marginTop: "-64px", zIndex: 4 }}
        />
        <h1 className="text-3xl font-mono font-bold text-white text-shadow-glow flex items-center">
          Dom<span className="animate-pulse ml-1">|</span>
        </h1>
        <div className="text-xs uppercase tracking-wide text-gray-400 mt-4 flex items-center gap-1">
          <svg width="15" height="15" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C8.1 2 5 5.1 5 9c0 5.2 6 13 6 13s6-7.8 6-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"/></svg>
          Seka
        </div>
        <div className="w-full flex flex-row items-center justify-center gap-4 mt-6 mb-2">
          <a href="https://www.facebook.com/dom.487441/" target="_blank" rel="noopener noreferrer">
            <SocialIcon src="https://ext.same-assets.com/251775738/1330486775.svg" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/sethxwut_07/" target="_blank" rel="noopener noreferrer">
            <SocialIcon src="https://ext.same-assets.com/251775738/240280409.svg" alt="Instagram" />
          </a>
          <a href="https://www.tiktok.com/@sethxwut_07?lang=th-TH" target="_blank" rel="noopener noreferrer">
             <SocialIcon src="https://ext.same-assets.com/251775738/1852358806.svg" alt="TikTok" />
          </a>
          <a href="https://open.spotify.com/user/31il6lyp5ckxwm5ibz56epjyvpbu" target="_blank" rel="noopener noreferrer">
            <SocialIcon src="https://ext.same-assets.com/251775738/3032300078.svg" alt="Spotify" />
          </a>
          <a href="https://steamcommunity.com/profiles/76561199185101179/" target="_blank" rel="noopener noreferrer">
           <SocialIcon src="https://ext.same-assets.com/251775738/2307791865.svg" alt="Steam" />
          </a>
          <a href="https://www.roblox.com/users/1986108914/profile" target="_blank" rel="noopener noreferrer">
           <SocialIcon src="https://ext.same-assets.com/251775738/1439471720.svg" alt="Roblox" />
          </a>
        </div>
        {/* Roblox Card */}
        <div className="w-full flex flex-row items-center gap-3 p-3 mt-4 rounded-xl glow-card-sm">
          <img
            src="https://tr.rbxcdn.com/30DAY-AvatarHeadshot-488F625DB9933731CD3C9B22978F258D-Png/150/150/AvatarHeadshot/Webp/noFilter"
            alt="FaceIT Avatar"
            className="w-14 h-14 rounded-lg border border-[#232323] object-cover"
          />
          <div className="flex-1">
            <a href="https://www.roblox.com/users/1986108914/profile" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-white hover:underline">
              <img src="https://ext.same-assets.com/251775738/1520844421.svg" alt="Roblox Icon" className="h-5 w-5 mr-1 inline-block" />
              <span>@Emp15x</span>
            </a>
            <div className="text-gray-400 text-xs mt-1 flex flex-row gap-4">
              <span>154 Friends</span>
              <span>3 Followers</span>
            </div>
          </div>
        </div>
        {/* Music Card - ใช้ของจริง */}
        <div className="w-full glow-card-sm p-4 mt-4 flex flex-col items-start bg-[#181818] rounded-2xl shadow-lg relative" style={{ boxShadow: "0 0 24px 6px #fff2, 0 1px 16px 2px #222c" }}>
          <div className="flex items-center mb-2 w-full">
            <img src={COVER_URL} alt="กลัวว่าฉันจะไม่เสียใจ Cover" className="w-12 h-12 rounded shadow-md mr-3 object-cover bg-[#232323]" />
            <div className="flex flex-col">
              <span className="text-white font-bold text-base leading-tight">กลัวว่าฉันจะไม่เสียใจ</span>
              <span className="text-gray-300 text-xs">Puepeech</span>
            </div>
            <span className="ml-auto opacity-90"><svg height="18" width="18" viewBox="0 0 24 24"><path fill="#fff" d="M4 22v-20h2v20zm7 0v-20h2v20zm7 0v-20h2v20z"/></svg></span>
          </div>
          <div className="flex flex-row items-center gap-4 mt-1 w-full">
            <button
              aria-label={isPlaying ? "Pause" : "Play"}
              onClick={handlePlayPause}
              className="w-8 h-8 flex items-center justify-center bg-[#222] rounded-full border border-[#444] text-white text-lg transition hover:bg-[#333] focus:outline-none"
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M8 5v14l11-7z"/></svg>
              )}
            </button>
            {/* Progress Bar with slider */}
            <div className="flex-1 flex items-center h-4 relative mx-2">
              <input
                type="range"
                min={0}
                max={duration}
                step={0.01}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 appearance-none bg-[#222] rounded h-1 cursor-pointer"
                style={{ accentColor: '#60a5fa' }}
              />
              {/* Overlay for colored played bar */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 pointer-events-none">
                <div
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                  className="h-1 bg-blue-400 rounded"
                />
              </div>
            </div>
            <span className="text-xs text-gray-200" style={{ minWidth: 32 }}>{formatTime(currentTime)}</span>
            <span className="text-xs text-gray-200" style={{ minWidth: 32 }}>{formatTime(duration)}</span>
          </div>
          <audio
            src={AUDIO_SRC}
            ref={audioRef}
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
        {/* Discord Card */}
        <a
           href="https://discordapp.com/users/957001659022704690"
           target="_blank"
           rel="noopener noreferrer"
           className="block"
        >
        <div className="w-full flex flex-row items-center gap-3 p-3 mt-4 mb-2 rounded-xl glow-card-sm">
          <img
            src="https://i.imgur.com/oR46U0G.jpeg"
            alt="Discord Avatar"
            className="w-12 h-12 rounded-lg border border-[#232323] object-cover"
          />
          <div className="flex-1">
            <span className="font-semibold text-white">sethawutnunkham <span className="inline">💙</span><span className="inline">🔵</span></span>
          </div>
          <span className="flex items-center gap-2">
            <img src="https://i.imgur.com/oR46U0G.jpeg" alt='' className="w-7 h-7 rounded" />
            <img src="https://ext.same-assets.com/251775738/1520844421.svg" alt='' className="w-6 h-6 rounded" />
          </span>
        </div>
        </a>
      </div>
    </div>
  );
}

// Glowing social icon button
function SocialIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="inline-flex items-center p-2 rounded-full bg-[#191919cc] shadow-[0_0_20px_3px_rgba(255,255,255,0.22)]">
      <img src={src} alt={alt} className="w-8 h-8 block" />
    </span>
  );
}

// Simple star bg component (canvas based, no framework deps)
function StarBackground() {
  useEffect(() => {
    const canvas = document.getElementById("bg-stars") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const stars = Array.from({ length: 60 }, () => [
      Math.random() * w,
      Math.random() * h,
      0.3 + Math.random() * 0.7
    ]);
    ctx.clearRect(0, 0, w, h);
    stars.forEach(([x, y, s]) => {
      ctx.beginPath();
      ctx.arc(x, y, s, 0, 2 * Math.PI);
      ctx.fillStyle = "rgba(220,220,220,0.3)";
      ctx.fill();
    });
  }, []);
  return <canvas id="bg-stars" className="stars-bg" />;
}
