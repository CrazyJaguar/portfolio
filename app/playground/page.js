'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Grid3x3, Type, Brain, Zap, Droplets, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Particle Canvas Component
function ParticleCanvas({ mode = 'flowing' }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const gravityWellsRef = useRef([]);
  const { theme } = useTheme();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let cw = window.innerWidth;
    let ch = window.innerHeight;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      cw = window.innerWidth;
      ch = window.innerHeight;
      canvas.width = Math.floor(cw * dpr);
      canvas.height = Math.floor(ch * dpr);
      canvas.style.width = `${cw}px`;
      canvas.style.height = `${ch}px`;
      // reset transform and scale according to DPR (avoid cumulative scaling)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const colors = theme === 'dark'
      ? ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#fb7185']
      : ['#2563eb', '#7c3aed', '#db2777', '#0891b2', '#059669', '#f97316', '#ef4444'];

    class Particle {
      constructor(x, y, opts = {}) {
        this.x = x;
        this.y = y;
        this.vx = opts.vx ?? (Math.random() - 0.5) * 2;
        this.vy = opts.vy ?? (Math.random() - 0.5) * 2;
        this.size = opts.size ?? (Math.random() * 3 + 1);
        this.color = opts.color ?? colors[Math.floor(Math.random() * colors.length)];
        this.life = opts.life ?? 1;
        this.decay = opts.decay ?? (Math.random() * 0.01 + 0.005);
        this.type = opts.type || 'normal'; // 'normal' | 'spark' | 'rocket' | 'paint'
      }

      update() {
        // Rockets: ascend, then explode when vy >= 0
        if (this.type === 'rocket') {
          this.vy += 0.06; // gravity on rocket
          this.x += this.vx;
          this.y += this.vy;
          this.life -= 0.002;
          return;
        }

        // Sparks/firework particles
        if (this.type === 'spark') {
          this.vy += 0.06; // gravity
          this.vx *= 0.99;
          this.vy *= 0.99;
          this.life -= this.decay * 1.5;
        }

        if (mode === 'flowing') {
          this.vx += (Math.random() - 0.5) * 0.12;
          this.vy += (Math.random() - 0.5) * 0.12;
          this.vx *= 0.98;
          this.vy *= 0.98;
        } else if (mode === 'gravity') {
          gravityWellsRef.current.forEach(well => {
            const dx = well.x - this.x;
            const dy = well.y - this.y;
            const dist2 = dx * dx + dy * dy + 0.0001;
            const dist = Math.sqrt(dist2);
            const strength = Math.min(1200 / dist2, 0.8); // stronger near the well
            this.vx += (dx / dist) * strength;
            this.vy += (dy / dist) * strength;
          });
          this.vx *= 0.995;
          this.vy *= 0.995;
        } else if (mode === 'firework') {
          // normal ambient particles still get a tiny gravity
          this.vy += 0.03;
          this.vx *= 0.995;
          this.vy *= 0.995;
          this.life -= this.decay;
        } else if (mode === 'paint' || this.type === 'paint') {
          this.vx *= 0.92;
          this.vy *= 0.92;
          this.life -= (this.decay * 0.2);
        }

        this.x += this.vx;
        this.y += this.vy;

        // bounce softly on edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -0.6;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -0.6;
      }

      draw() {
        if (this.type === 'spark') {
          ctx.globalAlpha = Math.max(0, this.life);
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, Math.max(1, this.size), 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        if (this.type === 'paint') {
          ctx.globalAlpha = Math.max(0.1, Math.min(0.9, this.life));
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 1.6, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        ctx.globalAlpha = mode === 'firework' ? Math.max(0, this.life) : 0.85;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // helper to spawn a firework explosion
    function explode(x, y) {
      const count = 80 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        const p = new Particle(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          life: 1,
          decay: 0.01 + Math.random() * 0.02,
          type: 'spark',
        });
        particlesRef.current.push(p);
      }
    }

    // initialize some ambient particles for background (use CSS pixels cw/ch)
    particlesRef.current = [];
    for (let i = 0; i < 120; i++) {
      particlesRef.current.push(new Particle(Math.random() * cw, Math.random() * ch));
    }

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left);
      const y = (e.clientY - rect.top);
      return { x, y };
    };

    const handleMouseMove = (e) => {
      const pos = getPos(e);
      mouseRef.current = { x: pos.x, y: pos.y, isDown: mouseRef.current.isDown };

      if ((mode === 'paint' || mouseRef.current.isDown && mode === 'paint')) {
        for (let i = 0; i < 6; i++) {
          particlesRef.current.push(new Particle(pos.x + (Math.random() - 0.5) * 10, pos.y + (Math.random() - 0.5) * 10, { type: 'paint', size: Math.random() * 6 + 3, color: colors[Math.floor(Math.random() * colors.length)], life: 0.9, decay: 0.005 }));
        }
      }
    };

    const handleMouseDown = (e) => {
      const pos = getPos(e);
      mouseRef.current.isDown = true;

      if (mode === 'gravity') {
        // add gravity well
        gravityWellsRef.current.push({ x: pos.x, y: pos.y, created: Date.now() });
        // keep only last 6 wells
        if (gravityWellsRef.current.length > 6) gravityWellsRef.current.shift();
      } else if (mode === 'firework') {
        // spawn a rocket that ascends and then explodes
        const rocket = new Particle(pos.x, ch - 20, { vx: (Math.random() - 0.5) * 2, vy: -6 - Math.random() * 3, size: 3, color: colors[Math.floor(Math.random() * colors.length)], type: 'rocket', life: 1 });
        particlesRef.current.push(rocket);
      } else if (mode === 'paint') {
        for (let i = 0; i < 12; i++) {
          particlesRef.current.push(new Particle(pos.x + Math.random() * 10 - 5, pos.y + Math.random() * 10 - 5, { type: 'paint', size: Math.random() * 6 + 2, color: colors[Math.floor(Math.random() * colors.length)], life: 0.95, decay: 0.006 }));
        }
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDown = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    let rafId = 0;
    const animate = () => {
      // different clearing for paint mode to leave strokes
      if (mode === 'paint') {
        ctx.fillStyle = theme === 'dark' ? 'rgba(8,10,15,0.08)' : 'rgba(255,255,255,0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = theme === 'dark' ? 'rgba(8,10,15,0.12)' : 'rgba(248,250,252,0.12)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // draw gravity wells
      if (mode === 'gravity') {
        gravityWellsRef.current.forEach((well, idx) => {
          const age = (Date.now() - well.created) / 1000;
          ctx.beginPath();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = theme === 'dark' ? `rgba(99,102,241,${0.12 + Math.max(0, 0.6 - age * 0.2)})` : `rgba(37,99,235,${0.12 + Math.max(0, 0.6 - age * 0.2)})`;
          ctx.arc(well.x, well.y, 120, 0, Math.PI * 2);
          ctx.stroke();
        });
      }

      // update particles (handle rockets specially)
      const next = [];
      for (let p of particlesRef.current) {
        if (p.type === 'rocket') {
          p.update();
          // when rocket slows/falls or life low - explode
          if (p.vy >= -0.5 || p.y < canvas.height * 0.15 || p.life < 0.5) {
            explode(p.x, p.y);
            continue; // remove rocket
          } else {
            p.draw();
            next.push(p);
          }
        } else {
          p.update();
          p.draw();
          if (p.type === 'spark') {
            if (p.life > 0.02) next.push(p);
          } else if (p.type === 'paint') {
            if (p.life > 0.02) next.push(p);
          } else if (mode === 'firework') {
            if (p.life > 0.02) next.push(p);
          } else {
            // ambient/flowing/gravity particles stay
            next.push(p);
          }
        }
      }

      particlesRef.current = next;

      // ensure ambient count so particles never die out
      const ambientThreshold = 100;
      while (particlesRef.current.length < ambientThreshold) {
        particlesRef.current.push(new Particle(Math.random() * cw, Math.random() * ch));
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', resize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [mode, theme]);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

// 2048 Game Component
function Game2048() {
  const [board, setBoard] = useState(() => {
    const initial = Array(4).fill(null).map(() => Array(4).fill(0));
    addNewTile(initial);
    addNewTile(initial);
    return initial;
  });
  const [score, setScore] = useState(0);
  const { theme } = useTheme();

  function addNewTile(grid) {
    const empty = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (grid[i][j] === 0) empty.push([i, j]);
      }
    }
    if (empty.length > 0) {
      const [row, col] = empty[Math.floor(Math.random() * empty.length)];
      grid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  }

  function moveLeft(grid) {
    let moved = false;
    let points = 0;
    const newGrid = grid.map(row => {
      const filtered = row.filter(cell => cell !== 0);
      const merged = [];
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          points += filtered[i] * 2;
          i++;
          moved = true;
        } else {
          merged.push(filtered[i]);
        }
      }
      while (merged.length < 4) merged.push(0);
      if (JSON.stringify(merged) !== JSON.stringify(row)) moved = true;
      return merged;
    });
    return { grid: newGrid, moved, points };
  }

  function rotateGrid(grid) {
    return grid[0].map((_, i) => grid.map(row => row[i]).reverse());
  }

  function handleMove(direction) {
    let newGrid = board.map(row => [...row]);
    let result;

    if (direction === 'left') {
      result = moveLeft(newGrid);
    } else if (direction === 'right') {
      newGrid = newGrid.map(row => row.reverse());
      result = moveLeft(newGrid);
      result.grid = result.grid.map(row => row.reverse());
    } else if (direction === 'up') {
      newGrid = rotateGrid(rotateGrid(rotateGrid(newGrid)));
      result = moveLeft(newGrid);
      result.grid = rotateGrid(result.grid);
    } else if (direction === 'down') {
      newGrid = rotateGrid(newGrid);
      result = moveLeft(newGrid);
      result.grid = rotateGrid(rotateGrid(rotateGrid(result.grid)));
    }

    if (result.moved) {
      addNewTile(result.grid);
      setBoard(result.grid);
      setScore(s => s + result.points);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        const direction = e.key.replace('Arrow', '').toLowerCase();
        handleMove(direction);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [board]);

  const getTileColor = (value) => {
    const colors = {
      2: theme === 'dark' ? 'bg-blue-500' : 'bg-blue-400',
      4: theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500',
      8: theme === 'dark' ? 'bg-purple-500' : 'bg-purple-400',
      16: theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500',
      32: theme === 'dark' ? 'bg-pink-500' : 'bg-pink-400',
      64: theme === 'dark' ? 'bg-pink-600' : 'bg-pink-500',
      128: theme === 'dark' ? 'bg-yellow-500' : 'bg-yellow-400',
      256: theme === 'dark' ? 'bg-yellow-600' : 'bg-yellow-500',
      512: theme === 'dark' ? 'bg-orange-500' : 'bg-orange-400',
      1024: theme === 'dark' ? 'bg-orange-600' : 'bg-orange-500',
      2048: theme === 'dark' ? 'bg-red-500' : 'bg-red-400',
    };
    return colors[value] || (theme === 'dark' ? 'bg-red-600' : 'bg-red-500');
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex gap-6 items-center">
        <div className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Score</div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{score}</div>
        </div>
        <button
          onClick={() => {
            const initial = Array(4).fill(null).map(() => Array(4).fill(0));
            addNewTile(initial);
            addNewTile(initial);
            setBoard(initial);
            setScore(0);
          }}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
        >
          New Game
        </button>
      </div>

      <div className={`grid grid-cols-4 gap-3 p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-xl'}`}>
        {board.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-2xl font-bold text-white transition-all duration-200 ${cell === 0 ? (theme === 'dark' ? 'bg-slate-700' : 'bg-slate-200') : getTileColor(cell)
                } ${cell !== 0 ? 'scale-100' : 'scale-95'}`}
            >
              {cell !== 0 && cell}
            </div>
          ))
        )}
      </div>

      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
        Use arrow keys to play
      </p>
    </div>
  );
}

// Word Scramble Game
function WordScramble() {
  const words = ['REACT', 'JAVASCRIPT', 'TYPESCRIPT', 'DEVELOPER', 'ALGORITHM', 'DATABASE', 'FRONTEND', 'BACKEND'];
  const [currentWord, setCurrentWord] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    newWord();
  }, []);

  const newWord = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(word);
    setScrambled(word.split('').sort(() => Math.random() - 0.5).join(''));
    setGuess('');
    setFeedback('');
  };

  const handleSubmit = () => {
    if (guess.toUpperCase() === currentWord) {
      setScore(s => s + 1);
      setFeedback('Correct! 🎉');
      setTimeout(newWord, 1500);
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
        <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Score</div>
        <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{score}</div>
      </div>

      <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-xl'}`}>
        <h3 className={`text-lg mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Unscramble this word:</h3>
        <div className="text-4xl font-bold mb-6 tracking-widest bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          {scrambled}
        </div>

        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Your guess..."
          className={`w-full px-4 py-3 rounded-lg text-center text-xl mb-4 outline-none ${theme === 'dark'
            ? 'bg-slate-700 text-white border-2 border-slate-600 focus:border-blue-500'
            : 'bg-slate-100 text-slate-900 border-2 border-slate-300 focus:border-blue-500'
            }`}
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Submit
          </button>
          <button
            onClick={newWord}
            className={`px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-900'
              }`}
          >
            Skip
          </button>
        </div>

        {feedback && (
          <div className={`mt-4 text-center text-lg font-medium ${feedback.includes('Correct') ? 'text-green-500' : 'text-red-500'
            }`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}

// Memory Card Game
function MemoryGame() {
  const emojis = ['🎮', '🎨', '🎭', '🎪', '🎬', '🎯', '🎲', '🎸'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, i) => ({ id: i, emoji }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const handleClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched([...matched, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="flex gap-6 items-center">
        <div className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Moves</div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{moves}</div>
        </div>
        <button
          onClick={initGame}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition-transform"
        >
          New Game
        </button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.id)}
            className={`w-20 h-20 rounded-lg text-3xl font-bold transition-all duration-300 ${flipped.includes(card.id) || matched.includes(card.id)
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-100'
              : theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 scale-95'
                : 'bg-white hover:bg-slate-50 shadow-lg scale-95'
              }`}
          >
            {(flipped.includes(card.id) || matched.includes(card.id)) && card.emoji}
          </button>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="text-2xl font-bold text-green-500 animate-bounce">
          🎉 You Won! 🎉
        </div>
      )}
    </div>
  );
}

// Reaction Time Tester
function ReactionTest() {
  const [stage, setStage] = useState('ready'); // ready, waiting, go, result
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState(null);
  const { theme } = useTheme();

  const start = () => {
    setStage('waiting');
    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      setStage('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (stage === 'waiting') {
      setStage('ready');
      setReactionTime(0);
    } else if (stage === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setStage('result');
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    } else if (stage === 'ready' || stage === 'result') {
      start();
    }
  };

  const getStageColor = () => {
    if (stage === 'ready' || stage === 'result') return theme === 'dark' ? 'bg-slate-800' : 'bg-white';
    if (stage === 'waiting') return 'bg-red-500';
    return 'bg-green-500';
  };

  const getStageText = () => {
    if (stage === 'ready') return 'Click to Start';
    if (stage === 'waiting') return 'Wait...';
    if (stage === 'go') return 'CLICK NOW!';
    return `${reactionTime}ms`;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      {bestTime && (
        <div className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-slate-800' : 'bg-white shadow-lg'}`}>
          <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>Best Time</div>
          <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{bestTime}ms</div>
        </div>
      )}

      <button
        onClick={handleClick}
        className={`w-96 h-96 rounded-3xl flex flex-col items-center justify-center gap-4 text-white text-4xl font-bold transition-all duration-300 hover:scale-105 ${getStageColor()}`}
      >
        <Zap size={64} className={stage === 'go' ? 'animate-pulse' : ''} />
        <div>{getStageText()}</div>
        {stage === 'result' && (
          <div className="text-lg font-normal">Click to try again</div>
        )}
      </button>

      <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} max-w-md text-center`}>
        {stage === 'ready' && 'Test your reaction time! Click when the screen turns green.'}
        {stage === 'waiting' && 'Wait for it... Don\'t click yet!'}
        {stage === 'go' && 'Click as fast as you can!'}
        {stage === 'result' && reactionTime < 200 && 'Lightning fast! ⚡'}
        {stage === 'result' && reactionTime >= 200 && reactionTime < 300 && 'Great reflexes! 🎯'}
        {stage === 'result' && reactionTime >= 300 && 'Not bad! Keep practicing! 💪'}
      </p>
    </div>
  );
}

// Main App Component
export default function PlaygroundHub() {
  const [activeGame, setActiveGame] = useState('particles');
  const [particleMode, setParticleMode] = useState('flowing');
  const [menuOpen, setMenuOpen] = useState(false);

  const games = [
    { id: 'particles', name: 'Particle Canvas', icon: Sparkles },
    { id: '2048', name: '2048', icon: Grid3x3 },
    { id: 'scramble', name: 'Word Scramble', icon: Type },
    { id: 'memory', name: 'Memory Match', icon: Brain },
    { id: 'reaction', name: 'Reaction Test', icon: Zap },
  ];

  const particleModes = [
    { id: 'flowing', name: 'Flowing', icon: Droplets },
    { id: 'gravity', name: 'Gravity Wells', icon: Sparkles },
    { id: 'firework', name: 'Fireworks', icon: Sparkles },
    { id: 'paint', name: 'Paint', icon: Droplets },
  ];

  return (
    <PlaygroundContent
      activeGame={activeGame}
      setActiveGame={setActiveGame}
      particleMode={particleMode}
      setParticleMode={setParticleMode}
      menuOpen={menuOpen}
      setMenuOpen={setMenuOpen}
      games={games}
      particleModes={particleModes}
    />
  );
}

function PlaygroundContent({ activeGame, setActiveGame, particleMode, setParticleMode, menuOpen, setMenuOpen, games, particleModes }) {
  const { theme, toggleTheme } = useTheme();



  // Add keyframes and utility styles on client only
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      
      @keyframes fadeInDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      
      .animate-float { animation: float 3s ease-in-out infinite; }
      .animate-fadeInDown { animation: fadeInDown 0.6s ease-out; }
      .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
      .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      .animate-gradient { animation: gradient 3s ease infinite; }
      .animate-blink { animation: blink 1s step-end infinite; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark'
      ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
      : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
      }`}>
      {/* theme-toggle lock handled via useEffect in PlaygroundContent to avoid setState-in-render */}
      {/* Particle Background */}
      {activeGame === 'particles' && <ParticleCanvas mode={particleMode} />}

      {/* Menu Toggle Button (Desktop) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={`fixed top-20 right-6 z-50 p-3 rounded-lg transition-all ${theme === 'dark'
          ? 'bg-slate-800/80 hover:bg-slate-700 text-white'
          : 'bg-white/80 hover:bg-slate-100 text-slate-900 shadow-lg'
          }`}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Side Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'
        } ${theme === 'dark' ? 'bg-slate-900/95 backdrop-blur-xl border-l border-slate-800' : 'bg-white/95 backdrop-blur-xl border-l border-slate-200 shadow-2xl'}`}>
        <div className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Choose a Game
          </h2>

          <div className="space-y-3">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => {
                  setActiveGame(game.id);
                  setMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeGame === game.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                  : theme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                <game.icon size={20} />
                <span className="font-medium">{game.name}</span>
              </button>
            ))}
          </div>

          {activeGame === 'particles' && (
            <>
              <h3 className={`text-lg font-bold mt-8 mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Particle Mode
              </h3>
              <div className="space-y-3">
                {particleModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setParticleMode(mode.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${particleMode === mode.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    <mode.icon size={18} />
                    <span className="text-sm font-medium">{mode.name}</span>
                  </button>
                ))}
              </div>

              <div className={`mt-6 p-4 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                }`}>
                <p className="font-medium mb-2">Instructions:</p>
                <ul className="space-y-1 text-xs">
                  <li>• <strong>Flowing:</strong> Watch particles flow naturally</li>
                  <li>• <strong>Gravity Wells:</strong> Click to create gravity points</li>
                  <li>• <strong>Fireworks:</strong> Click to launch fireworks</li>
                  <li>• <strong>Paint:</strong> Click and drag to paint</li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen pt-20 pointer-events-none">
        {activeGame === 'particles' && (
          <div className={`text-center p-8 rounded-2xl pointer-events-auto transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-900/50 backdrop-blur-sm' : 'bg-white/50 backdrop-blur-sm shadow-xl'
            }`}>
            <h2 className={`text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {particleModes.find(m => m.id === particleMode)?.name}
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {particleMode === 'flowing' && 'Relax and watch the particles flow'}
              {particleMode === 'gravity' && 'Click anywhere to create gravity wells'}
              {particleMode === 'firework' && 'Click to launch colorful fireworks'}
              {particleMode === 'paint' && 'Click and drag to paint with particles'}
            </p>
          </div>
        )}

        {/* Game containers need pointer events enabled */}
        <div className="pointer-events-auto">
          {activeGame === '2048' && <Game2048 />}
          {activeGame === 'scramble' && <WordScramble />}
          {activeGame === 'memory' && <MemoryGame />}
          {activeGame === 'reaction' && <ReactionTest />}
        </div>
      </main>

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
}

// Keyframes/styles are injected client-side inside `PlaygroundContent` useEffect.