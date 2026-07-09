import { useState } from "react";
import hallwayScene from "../assets/images/scenarios/shoes/shot-001-establishing-hallway.png";
import helpRequestScene from "../assets/images/scenarios/shoes/shot-002-parent-pov-help-request.png";

type PreviewScreen = "intro" | "help";

export default function App() {
  const [screen, setScreen] = useState<PreviewScreen>("intro");
  const isIntro = screen === "intro";
  const image = isIntro ? hallwayScene : helpRequestScene;
  const imageAlt = isIntro
    ? "Ребёнок сидит в прихожей с ботинком в руках"
    : "Ребёнок смотрит на родителя и протягивает ботинок";
  const imageClassName = isIntro ? "scene-image" : "scene-image scene-image--help";

  return (
    <main className="story-shell">
      <section className="story-frame" data-screen={screen} aria-label="Ботинки перед садиком">
        <img className={imageClassName} src={image} alt={imageAlt} />
        <div className="scene-scrim" />

        <header className="story-header" aria-label="Прогресс прохождения">
          <div className="progress-dots" aria-hidden="true">
            <span className="progress-dot is-active" />
            <span className={isIntro ? "progress-dot" : "progress-dot is-active"} />
            <span className="progress-dot" />
            <span className="progress-dot" />
            <span className="progress-dot" />
          </div>
          <span className="progress-label">Шаг {isIntro ? "1" : "2"} из 5</span>
        </header>

        <section className="story-card" aria-labelledby="scene-title" key={screen}>
          <div className="story-card-content">
            <p className="scene-kicker">Ботинки перед садиком</p>
            {isIntro ? (
              <>
                <h1 id="scene-title">Вы уже опаздываете.</h1>
                <p>Нужно было выйти несколько минут назад.</p>
                <p>Ты собираешь свои вещи, вещи ребёнка и понимаешь: снова не успеваете вовремя.</p>
              </>
            ) : (
              <>
                <h1 id="scene-title">«Мам, помоги».</h1>
                <p>Ребёнок смотрит прямо на тебя и держит ботинок так, будто сам уже не справляется.</p>
                <p>Что первым приходит тебе в голову?</p>
              </>
            )}
          </div>

          {isIntro ? (
            <button className="primary-action" type="button" onClick={() => setScreen("help")}>
              Продолжить
            </button>
          ) : (
            <button className="secondary-action" type="button" onClick={() => setScreen("intro")}>
              Вернуться к сцене
            </button>
          )}
        </section>
      </section>
    </main>
  );
}
