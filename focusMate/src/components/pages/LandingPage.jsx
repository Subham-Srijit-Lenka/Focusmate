import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Styles/LandingPage.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#0F1B41] via-[#061747] to-[#0F1B41] text-white">
      <section className=" grid grid-cols-2 grid-rows-2 gap-4 p-10 mt-15">
        <div className="flex justify-center items-center row-span-2 col-start-2">
          <img
            src="./asset/1.png"
            alt="Focus illustration"
            className="max-w-xs md:max-w-md w-full animate-imageEntrance"
          />
        </div>
        <div className="flex flex-col justify-center text-center md:text-left row-start-2 col-start-1 -mt-20 pl-40">
          <p className="lg:text-5xl md:text-2xl font-bold mb-2 animate-slideGlow">
            STAY FOCUSED.
          </p>
          <p className="lg:text-5xl md:text-2xl font-bold mb-2 animate-slideGlow delay-[300ms]">
            PLAN SMART.
          </p>
          <p className="lg:text-5xl md:text-2xl font-bold animate-slideGlow delay-[600ms]">
            MAKE PROGRESS.
          </p>
        </div>
      </section>

      <section
        className="text-center py-12 px-6 max-w-5xl mx-auto mt-20"
        data-aos="fade-up"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-200">
          Stop Procrastinating. Start Achieving.
        </h1>
        <p className="text-lg text-gray-200 mb-6 max-w-3xl mx-auto">
          Work alongside a real person in a virtual space — stay focused,
          accountable, and productive.
        </p>

        <div className="mt-4 flex gap-3 justify-center">
          <Link
            to="/taskmanager"
            className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            📋 Task Manager
          </Link>
          <Link
            to="/pomodoro"
            className="px-5 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            ⏳ Pomodoro Timer
          </Link>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="py-10 max-w-5xl mx-auto px-6" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          {[
            ["📅", "Step 1", "Set tasks"],
            ["💬", "Step 2", "Meet your partner online"],
            ["💻", "Step 3", "Work silently & stay on task"],
            ["🎉", "Step 4", "Celebrate your progress"],
          ].map(([icon, title, desc], i) => (
            <div
              key={i}
              data-aos="zoom-in"
              data-aos-delay={i * 100}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl pt-7 pb-5"
            >
              <div className="text-4xl mb-6">{icon}</div>
              <h3 className="font-semibold text-gray-400 mb-4">{title}</h3>
              <div className="text-gray-300">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="py-12" data-aos="fade-up">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Tools to Keep You on Track
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/taskmanager"
              className="bg-white text-gray-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="fade-right"
            >
              <img
                src="./asset/taskmanager.png"
                alt="Task Manager"
                className="w-full h-90 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold mb-3">Task Manager</h3>
                <p>Plan and track your to-do list efficiently.</p>
              </div>
            </Link>

            <Link
              to="/pomodoro"
              className="bg-white text-gray-900 rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              data-aos="fade-left"
            >
              <img
                src="./asset/pomodoro1.png"
                alt="Pomodoro Timer"
                className="w-full h-90 object-cover"
              />
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold mb-3">Pomodoro Timer</h3>
                <p>Stay focused with time-boxed work sessions.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 text-center" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-2">
          Your most productive hour starts now.
        </h2>
      </section>

      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        <Link
          to="/taskmanager"
          className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700"
          title="Go to Task Manager"
        >
          📋
        </Link>
        <Link
          to="/pomodoro"
          className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center shadow-lg hover:bg-green-700"
          title="Start Pomodoro"
        >
          ⏳
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
