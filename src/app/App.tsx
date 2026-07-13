import { useState } from "react";
import hallwayScene from "../assets/images/scenarios/shoes/shot-001-establishing-hallway.png";
import helpRequestScene from "../assets/images/scenarios/shoes/shot-002-parent-pov-help-request.png";

type PreviewScreen = "intro" | "help" | "choice" | "thought" | "context";
type FirstThoughtId = "delay" | "boundaries" | "whim" | "unsure";

type FirstThought = {
  id: FirstThoughtId;
  label: string;
  thoughtTitle: string;
  thoughtText: string;
  note: string;
};

const firstThoughts: FirstThought[] = [
  {
    id: "delay",
    label: "Он специально тянет время.",
    thoughtTitle: "Это очень понятная мысль.",
    thoughtText: "Когда мы торопимся, мозг быстро ищет объяснение: «он делает это специально».",
    note: "Пока это не факт, а первая гипотеза. Дальше мы проверим, что ещё могло происходить.",
  },
  {
    id: "boundaries",
    label: "Он проверяет мои границы.",
    thoughtTitle: "Возможно.",
    thoughtText: "Когда поведение повторяется в неудобный момент, мозг легко видит в нём проверку.",
    note: "Иногда такая версия бывает полезной, но сначала стоит собрать немного контекста.",
  },
  {
    id: "whim",
    label: "Он просто капризничает.",
    thoughtTitle: "Слово «каприз» быстро приходит на ум.",
    thoughtText: "Оно помогает назвать раздражающий момент, но не всегда объясняет, что именно происходит.",
    note: "За ним могут скрываться усталость, дискомфорт, перегруз или желание помощи.",
  },
  {
    id: "unsure",
    label: "Не знаю. Хочу разобраться.",
    thoughtTitle: "Это хорошая пауза.",
    thoughtText: "Не знать сразу — иногда честнее, чем быстро выбрать единственную версию.",
    note: "Пауза помогает не застрять в первой реакции и посмотреть на ситуацию шире.",
  },
];

export default function App() {
  const [screen, setScreen] = useState<PreviewScreen>("intro");
  const [selectedThought, setSelectedThought] = useState<FirstThoughtId | null>(null);
  const isIntro = screen === "intro";
  const isSceneBackground = isIntro;
  const image = isSceneBackground ? hallwayScene : helpRequestScene;
  const imageAlt = isSceneBackground
    ? "Ребёнок сидит в прихожей с ботинком в руках"
    : "Ребёнок смотрит на родителя и протягивает ботинок";
  const step = screen === "intro" ? 1 : screen === "help" ? 2 : screen === "choice" ? 3 : screen === "thought" ? 4 : 5;
  const thought = firstThoughts.find((item) => item.id === selectedThought) ?? firstThoughts[0];

  function chooseThought(thoughtId: FirstThoughtId) {
    setSelectedThought(thoughtId);
    setScreen("thought");
  }

  return (
    <main className="story-shell">
      <section className="story-frame" data-screen={screen} aria-label="Опять опаздываем">
        <img className="scene-image" src={image} alt={imageAlt} />
        <div className="scene-scrim" />

        <header className="story-header" aria-label="Прогресс прохождения">
          <div className="progress-dots" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((dot) => (
              <span key={dot} className={dot <= step ? "progress-dot is-active" : "progress-dot"} />
            ))}
          </div>
          <span className="progress-label">Шаг {step} из 5</span>
        </header>

        <section className="story-card" aria-labelledby="scene-title" key={screen}>
          <div className="story-card-content">
            {screen === "intro" && (
              <>
                <h1 id="scene-title">Неужели сегодня придём в сад вовремя?</h1>
                <p>Мы уже почти вышли...</p>
                <p><strong>Что может пойти не так?</strong></p>
              </>
            )}

            {screen === "help" && (
              <>
                <p className="dialogue-line" id="scene-title">— Мам, помоги...</p>
                <p>Ребёнок протягивает тебе ботинок и смотрит прямо в глаза.</p>
              </>
            )}

            {screen === "choice" && (
              <>
                <h1 id="scene-title">Что первым приходит тебе в голову?</h1>
                <div className="choice-list" role="list">
                  {firstThoughts.map((item) => (
                    <button className="choice-button" type="button" key={item.id} onClick={() => chooseThought(item.id)}>
                      {item.label}
                    </button>
                  ))}
                </div>
              </>
            )}

            {screen === "thought" && (
              <>
                <p className="thought-kicker">Ход мыслей</p>
                <p className="selected-thought" id="scene-title">💭 «{thought.label}»</p>
                <h1>{thought.thoughtTitle}</h1>
                <p>{thought.thoughtText}</p>
                <p className="thought-note">{thought.note}</p>
              </>
            )}

            {screen === "context" && (
              <>
                <p className="thought-kicker">Сбор контекста</p>
                <h1 id="scene-title">Теперь посмотрим шире.</h1>
                <p>Следующий шаг — собрать несколько деталей о сне, усталости, обуви и спешке.</p>
                <p className="quiet-note">Пока это заглушка для следующей итерации.</p>
              </>
            )}
          </div>

          {screen === "intro" && (
            <button className="primary-action" type="button" onClick={() => setScreen("help")}>
              Продолжить
            </button>
          )}

          {screen === "help" && (
            <button className="primary-action" type="button" onClick={() => setScreen("choice")}>
              Что первым приходит тебе в голову?
            </button>
          )}

          {screen === "thought" && (
            <button className="primary-action" type="button" onClick={() => setScreen("context")}>
              Давай разберёмся
            </button>
          )}

          {screen === "context" && (
            <button className="secondary-action" type="button" onClick={() => setScreen("choice")}>
              Вернуться к выбору
            </button>
          )}
        </section>
      </section>
    </main>
  );
}
