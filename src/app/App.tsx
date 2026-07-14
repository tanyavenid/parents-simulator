import { useState } from "react";
import hallwayScene from "../assets/images/scenarios/shoes/shot-001-establishing-hallway.png";
import helpRequestScene from "../assets/images/scenarios/shoes/shot-002-parent-pov-help-request.png";

type PreviewScreen = "intro" | "help" | "choice" | "thought" | "context";
type FirstThoughtId = "spite" | "help" | "insist";

type FirstThought = {
  id: FirstThoughtId;
  label: string;
  thoughtTitle: string;
  thoughtText: string;
  note: string;
};

const progressStages = ["Ситуация", "Первая мысль", "Контекст", "Возможные причины", "Что попробовать"] as const;

const firstThoughts: FirstThought[] = [
  {
    id: "spite",
    label: "Он делает это назло.",
    thoughtTitle: "Так действительно кажется многим родителям.",
    thoughtText: "Но в три года ребёнок ещё не способен специально строить поведение, чтобы «испортить вам утро».",
    note: "Гораздо полезнее сначала разобраться, какая потребность стоит за этим поведением.",
  },
  {
    id: "help",
    label: "Ладно, сделаю сама — так будет быстрее.",
    thoughtTitle: "Желание помочь совершенно естественно.",
    thoughtText: "Но если каждый раз делать всё за ребёнка сразу после первой просьбы, ему становится сложнее закрепить самостоятельность.",
    note: "Возможно, сейчас ему нужна вовсе не помощь с ботинками.",
  },
  {
    id: "insist",
    label: "Он умеет сам. Нужно просто настоять.",
    thoughtTitle: "Навык не всегда доступен одинаково.",
    thoughtText: "Если ребёнок действительно умеет обуваться, это ещё не значит, что он всегда может воспользоваться этим навыком.",
    note: "Иногда ему мешают усталость, эмоции или другие причины, которые не видны с первого взгляда.",
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
  const stageIndex = screen === "intro" || screen === "help" ? 0 : screen === "choice" || screen === "thought" ? 1 : 2;
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
            {progressStages.map((stage, index) => (
              <span key={stage} className={index <= stageIndex ? "progress-dot is-active" : "progress-dot"} />
            ))}
          </div>
          <span className="progress-label">{progressStages[stageIndex]}</span>
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
                <p className="thought-kicker">Проверяем гипотезу</p>
                <h1 id="scene-title">Может быть, сейчас просто не хватает ресурса?</h1>
                <p>Следующий шаг — спокойно проверить сон, голод, самочувствие и признаки усталости.</p>
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
              Давайте проверим
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
