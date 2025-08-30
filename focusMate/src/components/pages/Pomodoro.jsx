import React, { useState, useEffect, useRef } from "react";
import Layout from "../layout/Layout";
import { motion, AnimatePresence } from "framer-motion";

const FlipDigit = ({ value }) => {
  return (
    <div className="relative w-16 h-24 perspective">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center 
                     text-8xl font-bold text-cyan-500 bg-white rounded-lg 
                     shadow-md"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const intervalRef = useRef(null);

  const formatDigits = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return (m + ":" + s).split("");
  };

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    } else {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev === 0) {
            clearInterval(intervalRef.current);
            if (isBreak) {
              setIsBreak(false);
              setTime(workDuration * 60);
              setPomodoroCount((c) => c + 1);
            } else {
              setIsBreak(true);
              setTime(breakDuration * 60);
            }
            setIsRunning(false);
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setIsBreak(false);
    setTime(workDuration * 60);
  };

  const handleWorkChange = (e) => {
    setWorkDuration(Number(e.target.value));
    if (!isRunning && !isBreak) setTime(Number(e.target.value) * 60);
  };

  const handleBreakChange = (e) => {
    setBreakDuration(Number(e.target.value));
    if (!isRunning && isBreak) setTime(Number(e.target.value) * 60);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[90vh] relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-white
                     border-2 border-cyan-400 rounded-3xl
                     shadow-[0_0_25px_5px_rgba(0,200,255,0.5)]
                     w-full max-w-2xl p-12 z-10 mt-[-30px]"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-3xl font-semibold text-center text-gray-900 mb-6"
          >
            {isBreak ? "Break Time ☕" : "Work Session 💻"}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center space-x-[2px] mb-8"
          >
            {formatDigits(time).map((char, i) =>
              char === ":" ? (
                <span
                  key={`colon-${i}`}
                  className="text-6xl text-gray-600 px-1"
                >
                  :
                </span>
              ) : (
                <FlipDigit key={i + "-" + char} value={char} />
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6"
          >
            <button
              onClick={toggleTimer}
              className="px-8 py-4 text-lg
                         bg-gradient-to-r from-[#081461] to-[#0A1A7E]
                         text-white font-bold rounded-2xl shadow-lg
                         transition-all duration-300"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetTimer}
              className="px-8 py-4 text-lg
                         bg-gradient-to-r from-gray-700 to-gray-900
                         text-white font-bold rounded-2xl shadow-lg
                         transition-all duration-300"
            >
              Reset
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 space-y-4"
          >
            <div className="flex justify-between items-center">
              <label className="text-gray-800 font-medium">
                Work Duration:
              </label>
              <select
                value={workDuration}
                onChange={handleWorkChange}
                className="bg-gray-200 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400"
              >
                {[15, 20, 25, 30, 35, 40, 45, 50].map((val) => (
                  <option key={val} value={val}>
                    {val} min
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-gray-800 font-medium">
                Break Duration:
              </label>
              <select
                value={breakDuration}
                onChange={handleBreakChange}
                className="bg-gray-200 text-gray-900 rounded-lg px-3 py-2 focus:ring-2 focus:ring-cyan-400"
              >
                {[5, 10, 15, 20].map((val) => (
                  <option key={val} value={val}>
                    {val} min
                  </option>
                ))}
              </select>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 text-center text-gray-800 font-medium"
          >
            Completed Pomodoros:{" "}
            <span className="text-cyan-600 font-bold">{pomodoroCount}</span>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default Pomodoro;
