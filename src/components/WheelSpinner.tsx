"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { RotateCw, Trash2, Plus, Volume2, VolumeX, Share2 } from "lucide-react";

interface WheelSpinnerProps {
  initialOptions?: string[];
  storageKey?: string;
}

const PASTEL_COLORS = [
  "#FDDF5C", // Retro Yellow
  "#85E3B2", // Retro Mint
  "#4E9BB9", // Retro Blue
  "#F27A54", // Retro Orange
  "#A78BFA", // Light Purple
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
];

export default function WheelSpinner({
  initialOptions = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
  storageKey = "gamewheelclub-main-wheel",
}: WheelSpinnerProps) {
  const [options, setOptions] = useState<string[]>([]);
  const [newOption, setNewOption] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const controls = useAnimation();
  const rotationRef = useRef(0);

  // Initialize options from localStorage or defaults
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setOptions(JSON.parse(saved));
      } catch {
        setOptions(initialOptions);
      }
    } else {
      setOptions(initialOptions);
    }
  }, [storageKey, initialOptions]);

  // Save to localStorage when changed
  useEffect(() => {
    if (options.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(options));
    }
  }, [options, storageKey]);

  // Audio trigger for tick sound
  const playTickSound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (_) {}
  };

  // Redraw the canvas wheel whenever options or size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || options.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;
    ctx.clearRect(0, 0, size, size);

    const arcSize = (2 * Math.PI) / options.length;

    options.forEach((opt, idx) => {
      const startAngle = idx * arcSize - Math.PI / 2;
      const endAngle = startAngle + arcSize;

      // Draw Slice
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.fillStyle = PASTEL_COLORS[idx % PASTEL_COLORS.length];
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#0B132B";
      ctx.stroke();

      // Draw Text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(startAngle + arcSize / 2);
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      
      // Dynamically scale font size and stroke width based on option count to maximize readability
      const fontSize = Math.max(12, Math.min(22, Math.floor(260 / Math.sqrt(options.length))));
      ctx.font = `900 ${fontSize}px "Arial Black", "Impact", sans-serif`;
      
      // Truncate text if too long
      const text = opt.length > 15 ? opt.substring(0, 13) + "..." : opt;
      
      // Add a thick white outline that scales with the font size
      ctx.lineJoin = "round";
      ctx.miterLimit = 2;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = Math.max(3, Math.min(6, fontSize / 3.5));
      ctx.strokeText(text, radius - 20, 0);
      
      // Fill the main text body
      ctx.fillStyle = "#0B132B";
      ctx.fillText(text, radius - 20, 0);
      ctx.restore();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#FAF5EC";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#0B132B";
    ctx.stroke();
  }, [options]);

  const handleSpin = async () => {
    if (isSpinning || options.length === 0) return;
    setIsSpinning(true);
    setWinner(null);

    // Calculate rotation and final winner
    const spinRotations = 5 + Math.random() * 5; // 5 to 10 full spins
    const targetDegrees = spinRotations * 360;
    const finalRotation = rotationRef.current + targetDegrees;

    // Determine winner based on angle relative to top pointer (270 degrees on canvas coordinates)
    const arcAngle = 360 / options.length;
    const currentAngleOffset = (finalRotation % 360);
    const winnerIdx = Math.floor((360 - currentAngleOffset) / arcAngle) % options.length;
    const finalWinner = options[winnerIdx < 0 ? winnerIdx + options.length : winnerIdx];

    // Simulating ticks during rotation
    let lastTickAngle = 0;
    const tickInterval = setInterval(() => {
      // Get current rotation approximation (roughly estimated for audio)
      playTickSound();
    }, 120);

    await controls.start({
      rotate: finalRotation,
      transition: { duration: 4, ease: [0.2, 0.8, 0.2, 1] },
    });

    clearInterval(tickInterval);
    rotationRef.current = finalRotation;
    setWinner(finalWinner);
    setIsSpinning(false);
  };

  const addOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOption.trim()) return;
    setOptions([...options, newOption.trim()]);
    setNewOption("");
  };

  const removeOption = (idx: number) => {
    if (options.length <= 2) {
      alert("You need at least 2 options to spin!");
      return;
    }
    const updated = options.filter((_, i) => i !== idx);
    setOptions(updated);
  };

  const bulkAddOptions = (text: string) => {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    if (lines.length > 0) {
      setOptions(lines);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6 px-4">
      {/* Wheel Column */}
      <div className="flex flex-col items-center justify-center relative">
        {/* Pointer */}
        <div className="absolute top-[2px] z-10 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-retro-navy dark:border-t-cream drop-shadow-[0_4px_0_rgba(11,19,43,0.3)]" />

        <div className="relative neo-border bg-white dark:bg-retro-navy p-4 rounded-full aspect-square w-full max-w-[400px] flex items-center justify-center overflow-hidden">
          <motion.div
            animate={controls}
            className="w-full h-full flex items-center justify-center"
            style={{ originX: 0.5, originY: 0.5 }}
          >
            <canvas
              ref={canvasRef}
              width={380}
              height={380}
              className="w-full h-full rounded-full"
            />
          </motion.div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4 mt-6">
          <button
            onClick={handleSpin}
            disabled={isSpinning || options.length === 0}
            className="px-8 py-3 neo-btn bg-retro-orange text-white dark:text-retro-navy text-lg flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
          >
            <RotateCw className={`w-5 h-5 ${isSpinning ? "animate-spin" : ""}`} />
            {isSpinning ? "Spinning..." : "SPIN!"}
          </button>
          
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-3 neo-btn bg-white dark:bg-retro-navy text-retro-navy dark:text-cream hover:bg-slate-100 transition-colors"
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Winner Announcement */}
        {winner && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 neo-card bg-retro-yellow text-retro-navy text-center max-w-sm"
          >
            <p className="text-xs uppercase font-extrabold tracking-widest text-retro-navy/60">The Winner is</p>
            <h3 className="text-2xl font-black">{winner}</h3>
          </motion.div>
        )}
      </div>

      {/* Editor Column */}
      <div className="neo-card p-6 bg-white dark:bg-retro-navy transition-colors">
        <h2 className="text-xl font-bold font-display mb-4 border-b-3 border-retro-navy dark:border-cream pb-2">
          Wheel Options
        </h2>

        {/* Single Add Form */}
        <form onSubmit={addOption} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add new option..."
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            className="flex-1 neo-input"
            maxLength={30}
          />
          <button
            type="submit"
            className="px-4 py-2 neo-btn bg-retro-mint text-retro-navy flex items-center justify-center hover:scale-102 transition-transform"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* List of current options */}
        <div className="max-h-[220px] overflow-y-auto mb-4 border-2 border-retro-navy dark:border-cream rounded-lg p-2 bg-cream dark:bg-retro-navy/40">
          {options.map((opt, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-white dark:bg-retro-navy border border-retro-navy/20 dark:border-cream/20 rounded px-3 py-2 mb-1 text-sm font-semibold"
            >
              <span>{opt}</span>
              <button
                onClick={() => removeOption(idx)}
                className="text-retro-orange hover:text-red-600 transition-colors"
                aria-label={`Remove option ${opt}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Bulk Input option */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-retro-navy/70 dark:text-cream/70">
            Bulk Edit (one option per line)
          </label>
          <textarea
            rows={3}
            placeholder="Paste your options here..."
            onChange={(e) => bulkAddOptions(e.target.value)}
            value={options.join("\n")}
            className="w-full neo-input text-sm resize-none"
          />
        </div>
      </div>
    </div>
  );
}
