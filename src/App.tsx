import { useState } from "react";
import { QUESTIONS } from "./data/questions";
import { useTheme } from "./hooks/useTheme";
import { shuffle } from "./utils/shuffle";
import ThemeToggle from "./components/ThemeToggle";
import StartScreen from "./components/StartScreen";
import QuizScreen from "./components/QuizScreen";
import ResultScreen from "./components/ResultScreen";

type Stage = "start" | "quiz" | "result";

export default function App() {
  const { theme, toggle } = useTheme();
  const [stage, setStage] = useState<Stage>("start");
  const [name, setName] = useState("");
  const [order, setOrder] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);

  const start = (userName: string) => {
    setName(userName);
    // каждый запуск — новый случайный порядок
    setOrder(shuffle(QUESTIONS));
    setAnswers([]);
    setStage("quiz");
    window.scrollTo(0, 0);
  };

  const finish = (result: string[]) => {
    setAnswers(result);
    setStage("result");
    window.scrollTo(0, 0);
  };

  const restart = () => {
    setStage("start");
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative min-h-screen">
      <ThemeToggle
        theme={theme}
        onToggle={toggle}
        position={stage === "start" ? "bottom-right" : "top-right"}
      />

      {stage === "start" && (
        <StartScreen
          total={QUESTIONS.length}
          initialName={name}
          onStart={start}
        />
      )}
      {stage === "quiz" && <QuizScreen questions={order} onFinish={finish} />}
      {stage === "result" && (
        <ResultScreen
          name={name}
          questions={order}
          answers={answers}
          onRestart={restart}
        />
      )}
    </div>
  );
}
