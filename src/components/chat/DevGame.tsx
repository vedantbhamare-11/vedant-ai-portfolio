"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, User, Bot, Crosshair, BrainCircuit } from "lucide-react";

type Player = 1 | 2; // 1 = Green (You), 2 = Red (AI)
type Cell = 0 | 1 | 2;
type Difficulty = "easy" | "medium" | "hard";

const TOTAL_NODES = 25;

// HELPER: Get adjacencies for the 25-node Octagonal Web
const getAdj = (n: number): number[] => {
  if (n === 0) return [1, 2, 3, 4, 5, 6, 7, 8];
  const ring = Math.floor((n - 1) / 8) + 1;
  const ang = (n - 1) % 8;
  const adj: number[] = [];
  
  if (ring === 1) adj.push(0);
  else adj.push((ring - 2) * 8 + ang + 1); // Inward
  if (ring < 3) adj.push(ring * 8 + ang + 1); // Outward
  
  const leftAng = (ang + 7) % 8;
  const rightAng = (ang + 1) % 8;
  adj.push((ring - 1) * 8 + leftAng + 1);
  adj.push((ring - 1) * 8 + rightAng + 1);
  
  return adj;
};

// HELPER: Position Nodes Graphically
const getPosPct = (i: number) => {
  if (i === 0) return { x: 50, y: 50 };
  const ring = Math.floor((i - 1) / 8) + 1;
  const ang = (i - 1) % 8;
  const r = ring === 1 ? 14 : ring === 2 ? 28 : 42; 
  const angle = (ang * 45 - 90) * (Math.PI / 180);
  return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle) };
};

export default function DevGame() {
  const [board, setBoard] = useState<Cell[]>([]);
  const [turn, setTurn] = useState<Player>(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<0 | 1 | 2>(0);
  const [counts, setCounts] = useState({ 1: 2, 2: 2 });
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const initGame = () => {
    const newBoard = Array(TOTAL_NODES).fill(0);
    // SYMMETRIC START
    newBoard[17] = 1; // Green Top
    newBoard[21] = 1; // Green Bottom
    newBoard[19] = 2; // Red Right
    newBoard[23] = 2; // Red Left
    
    setBoard(newBoard);
    setTurn(1);
    setGameOver(false);
    setWinner(0);
    updateCounts(newBoard);
  };

  useEffect(() => { initGame(); }, []);

  const updateCounts = (currentBoard: Cell[]) => {
    let p1 = 0, p2 = 0;
    currentBoard.forEach((c) => { if (c === 1) p1++; if (c === 2) p2++; });
    setCounts({ 1: p1, 2: p2 });
  };

  const getValidMoves = (player: Player, currentBoard: Cell[]) => {
    const moves: number[] = [];
    for (let i = 0; i < TOTAL_NODES; i++) {
      if (currentBoard[i] === 0 && getAdj(i).some((adj) => currentBoard[adj] === player)) {
        moves.push(i);
      }
    }
    return moves;
  };

  // CORE LOGIC: Simulate a move
  const simulateMove = (currentBoard: Cell[], move: number, player: Player) => {
    const newBoard = [...currentBoard];
    newBoard[move] = player;
    const enemy = player === 1 ? 2 : 1;
    getAdj(move).forEach((adj) => {
      if (newBoard[adj] === enemy) newBoard[adj] = player;
    });
    return newBoard;
  };

  // AI TURN LOGIC
  useEffect(() => {
    if (board.length === 0) return;

    const p1Moves = getValidMoves(1, board);
    const p2Moves = getValidMoves(2, board);

    if (p1Moves.length === 0 && p2Moves.length === 0) {
      setGameOver(true);
      if (counts[1] > counts[2]) setWinner(1);
      else if (counts[2] > counts[1]) setWinner(2);
      else setWinner(0);
    } else if (turn === 2 && !gameOver) {
      
      const timer = setTimeout(() => {
        if (p2Moves.length > 0) {
          let bestMove = p2Moves[0];

          if (difficulty === "easy") {
            // EASY: Completely Random
            bestMove = p2Moves[Math.floor(Math.random() * p2Moves.length)];
          } 
          else if (difficulty === "medium") {
            // MEDIUM: Greedy Algorithm (Maximize immediate points, ignore traps)
            let maxFlips = -1;
            p2Moves.forEach((move) => {
              let flips = 0;
              getAdj(move).forEach(adj => { if (board[adj] === 1) flips++; });
              // Add tiny jitter to break ties randomly
              const score = flips + Math.random() * 0.1; 
              if (score > maxFlips) { maxFlips = score; bestMove = move; }
            });
          } 
          else if (difficulty === "hard") {
            // HARD: Minimax (Simulates player's counter-attack)
            let maxGuaranteedScore = -Infinity;
            p2Moves.forEach((aiMove) => {
              const boardAfterAI = simulateMove(board, aiMove, 2);
              const possiblePlayerResponses = getValidMoves(1, boardAfterAI);
              
              let minScoreForAI = Infinity;
              if (possiblePlayerResponses.length === 0) {
                minScoreForAI = boardAfterAI.filter(c => c === 2).length;
              } else {
                possiblePlayerResponses.forEach(p1Move => {
                  const boardAfterP1 = simulateMove(boardAfterAI, p1Move, 1);
                  const aiScore = boardAfterP1.filter(c => c === 2).length;
                  if (aiScore < minScoreForAI) minScoreForAI = aiScore;
                });
              }

              const scoreWithJitter = minScoreForAI + (Math.random() * 0.4);
              if (scoreWithJitter > maxGuaranteedScore) {
                maxGuaranteedScore = scoreWithJitter;
                bestMove = aiMove;
              }
            });
          }

          const finalBoard = simulateMove(board, bestMove, 2);
          setBoard(finalBoard);
          updateCounts(finalBoard);
          
          if (getValidMoves(1, finalBoard).length > 0) setTurn(1);
          else if (getValidMoves(2, finalBoard).length === 0) setTurn(1); 
          
        } else {
          setTurn(1); 
        }
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [turn, board, gameOver, difficulty]);

  const handleCellClick = (node: number) => {
    if (turn !== 1 || gameOver) return;
    const p1Moves = getValidMoves(1, board);
    if (p1Moves.includes(node)) {
      const finalBoard = simulateMove(board, node, 1);
      setBoard(finalBoard);
      updateCounts(finalBoard);
      
      if (getValidMoves(2, finalBoard).length > 0) setTurn(2);
    }
  };

  const handleDifficultyChange = (level: Difficulty) => {
    setDifficulty(level);
    initGame(); // Reset game when difficulty changes
  };

  if (board.length === 0) return null;
  const p1Moves = getValidMoves(1, board);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-4 flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-sm"
    >
      {/* SCORE TRACKERS */}
      <div className="flex items-center justify-between bg-neutral-950 px-5 py-3">
        <div className="flex flex-col items-start">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-green-500">
            <User className="h-3.5 w-3.5" /> You
          </span>
          <span className="text-2xl font-black text-white">{counts[1]}</span>
        </div>
        
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            {gameOver ? "Match Over" : turn === 1 ? "Your Turn" : "AI Thinking"}
          </span>
          {!gameOver && turn === 1 && (
            <span className="mt-1 flex items-center gap-1 text-[10px] text-green-400">
              <Crosshair className="h-3 w-3" /> Select Node
            </span>
          )}
        </div>

        <div className="flex flex-col items-end">
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-red-500">
            Bot <Bot className="h-3.5 w-3.5" />
          </span>
          <span className="text-2xl font-black text-white">{counts[2]}</span>
        </div>
      </div>

      {/* DIFFICULTY SELECTOR */}
      <div className="flex w-full items-center justify-center gap-2 border-b border-neutral-800 bg-neutral-950 pb-3 px-4">
        <BrainCircuit className="h-4 w-4 text-neutral-500" />
        <div className="flex rounded-lg bg-neutral-900 p-1">
          {(["easy", "medium", "hard"] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => handleDifficultyChange(level)}
              className={`rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                difficulty === level 
                  ? "bg-neutral-700 text-white shadow-sm" 
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* GAME GRID */}
      <div className="relative flex aspect-square w-full items-center justify-center p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 to-neutral-900">
        
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full opacity-20">
          <circle cx="50" cy="50" r="14" stroke="#ffffff" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="28" stroke="#ffffff" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="42" stroke="#ffffff" strokeWidth="0.5" fill="none" />
          {[0, 45, 90, 135].map((deg) => (
            <line
              key={deg}
              x1={50 + 42 * Math.cos((deg * Math.PI) / 180)}
              y1={50 + 42 * Math.sin((deg * Math.PI) / 180)}
              x2={50 + 42 * Math.cos(((deg + 180) * Math.PI) / 180)}
              y2={50 + 42 * Math.sin(((deg + 180) * Math.PI) / 180)}
              stroke="#ffffff"
              strokeWidth="0.5"
            />
          ))}
        </svg>

        {/* NODES */}
        {board.map((cell, i) => {
          const pos = getPosPct(i);
          const isValid = turn === 1 && !gameOver && p1Moves.includes(i);
          
          return (
            <motion.button
              key={i}
              initial={{ scale: 0 }}
              animate={{ 
                scale: cell !== 0 ? 1 : isValid ? 0.9 : 0.6,
                backgroundColor: cell === 1 ? "#22c55e" : cell === 2 ? "#ef4444" : isValid ? "rgba(34,197,94,0.2)" : "#262626"
              }}
              onClick={() => handleCellClick(i)}
              disabled={turn !== 1 || (!isValid && cell !== 1)}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`
                absolute flex h-7 w-7 sm:h-9 sm:w-9 -translate-x-1/2 -translate-y-1/2 
                items-center justify-center rounded-full border-2 transition-all duration-200
                ${cell === 1 ? "border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)] z-20" : ""}
                ${cell === 2 ? "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20" : ""}
                ${cell === 0 && !isValid ? "border-neutral-800" : ""}
                ${isValid ? "border-green-500 border-dashed cursor-pointer z-30 hover:bg-green-500 hover:border-solid hover:scale-110" : "cursor-default"}
              `}
            />
          );
        })}
      </div>

      {/* FOOTER */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col items-center justify-center border-t border-neutral-800 bg-neutral-950 px-4 py-5"
          >
            <h3 className="text-xl font-black text-white tracking-tight">
              {winner === 1 ? "🏆 YOU WON!" : winner === 2 ? "💀 AI DOMINATED" : "🤝 STALEMATE"}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 mb-4 text-center">
              {winner === 1 ? "Great strategy." : "Try dropping the difficulty if you're stuck!"}
            </p>
            <button
              onClick={initGame}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-neutral-900 transition-all hover:bg-neutral-200 active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> PLAY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}