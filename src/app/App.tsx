import { useState } from "react";
import hallwayScene from "../assets/images/scenarios/shoes/shot-001-establishing-hallway.png";
import helpRequestScene from "../assets/images/scenarios/shoes/shot-002-parent-pov-help-request.png";

type FirstThoughtId = "spite" | "help" | "insist";
type ReasonId = "energy" | "connection" | "skill" | "help-pattern";
type Screen =
  | { kind: "intro" }
  | { kind: "help" }
  | { kind: "choice" }
  | { kind: "thought" }
  | { kind: "check"; reasonId: ReasonId }
  | { kind: "reason"; reasonId: ReasonId }
  | { kind: "actions"; reasonId: ReasonId }
  | { kind: "final"; tone: "accepted" | "unmatched" };

type FirstThought = {
  id: FirstThoughtId;
  label: string;
  title: string;
  text: string;
  note: string;
};

type Reason = {
  id: ReasonId;
  question: string;
  prompts: string[];
  title: string;
  explanation: string[];
  actions: string[];
  transition?: string;
};

const progressStages = ["Ситуация", "Первая мысль", "Посмотрим шире", "Что можно попробовать", "Итоги"] as const;

const firstThoughts: FirstThought[] = [
  {
    id: "spite",
    label: "Он делает это назло.",
    title: "Так действительно кажется многим родителям.",
    text: "Но в три года ребёнок ещё не способен специально строить поведение, чтобы «испортить вам утро».",
    note: "Гораздо полезнее сначала разобраться, какая потребность стоит за этим поведением.",
  },
  {
    id: "help",
    label: "Ладно, сделаю сама — так будет быстрее.",
    title: "Желание помочь совершенно естественно.",
    text: "Но если каждый раз делать всё за ребёнка сразу после первой просьбы, ему становится сложнее закрепить самостоятельность.",
    note: "Возможно, сейчас ему нужна вовсе не помощь с ботинками.",
  },
  {
    id: "insist",
    label: "Он умеет сам. Нужно просто настоять.",
    title: "Навык не всегда доступен одинаково.",
    text: "Если ребёнок действительно умеет обуваться, это ещё не значит, что он всегда может воспользоваться этим навыком.",
    note: "Иногда ему мешают усталость, эмоции или другие причины, которые не видны с первого взгляда.",
  },
];

const reasons: Reason[] = [
  {
    id: "energy",
    question: "Может быть, сейчас просто не хватает сил?",
    prompts: [
      "Сегодня он плохо спал, голоден или начинает заболевать?",
      "День был необычно насыщенным или эмоционально сложным?",
      "Кроме ботинок есть и другие признаки усталости: плаксивость, раздражительность, трудно переключается?",
    ],
    title: "Сейчас, вероятно, не хватает сил",
    explanation: [
      "Когда ребёнок устает или плохо себя чувствует, мозг начинает экономить силы.",
      "Сложнее всего становятся действия, которые требуют внимания, планирования и усилий — даже если вчера они легко получались.",
      "Поэтому просьба о помощи может быть следствием состояния, а не отсутствия самостоятельности.",
    ],
    actions: [
      "Если возможно, снизьте требования именно сегодня.",
      "Помогите там, где ребёнку сейчас действительно тяжело.",
      "Обратите внимание на сон, голод, болезнь или перегрузку.",
      "Помните: усталость временно снижает доступ даже к уже освоенным навыкам.",
    ],
    transition: "Тогда, возможно, дело не только в усталости. Посмотрим, что ещё может происходить.",
  },
  {
    id: "connection",
    question: "Может быть, сейчас ему особенно нужен контакт?",
    prompts: [
      "Это чаще происходит перед расставанием или после долгого дня?",
      "После вашей помощи ребёнок быстро успокаивается?",
      "В последнее время он чаще просит помочь и в других мелочах?",
    ],
    title: "Возможно, сейчас ему важнее всего побыть рядом",
    explanation: [
      "Для ребёнка помощь — это не только способ быстрее надеть ботинки.",
      "Иногда это способ получить несколько минут близости перед расставанием или после долгого дня.",
      "В этот момент ему нужен не ботинок, а взрослый рядом.",
    ],
    actions: [
      "На несколько минут переключитесь с задачи на самого ребёнка.",
      "Дайте ему почувствовать, что вы рядом.",
      "Если время позволяет, превратите одевание в совместный ритуал.",
      "Постепенно возвращайте инициативу: «Первую липучку ты, вторую — я».",
    ],
    transition: "Если это не про вашу ситуацию, можно посмотреть на сам навык.",
  },
  {
    id: "skill",
    question: "Может быть, навык ещё закрепляется?",
    prompts: [
      "Ребёнок освоил этот навык относительно недавно?",
      "Иногда получается отлично, а иногда нет?",
      "Если его не торопить, он всё-таки справляется самостоятельно?",
    ],
    title: "Навык ещё становится устойчивым",
    explanation: [
      "Развитие редко идёт по прямой.",
      "Даже освоенный навык мозгу нужно постепенно автоматизировать.",
      "Поэтому временные «откаты» — обычная часть обучения, а не потеря умения.",
    ],
    actions: [
      "Давайте ребёнку возможность пробовать самому.",
      "Не вмешивайтесь сразу при первых трудностях.",
      "Замечайте успехи, а не только неудачные попытки.",
      "Помните, что автоматизация требует времени.",
    ],
    transition: "Если навык уже устойчивый, есть ещё одна возможная причина.",
  },
  {
    id: "help-pattern",
    question: "Может быть, он исследует, как работает помощь взрослых?",
    prompts: [
      "Этот навык давно стал привычным?",
      "Иногда ребёнок просит помочь, а иногда спокойно делает всё сам?",
      "После спокойного отказа он обычно всё-таки справляется?",
    ],
    title: "Сейчас ребёнок исследует новые возможности",
    explanation: [
      "Освоив навык, ребёнок начинает учиться следующему.",
      "Теперь он исследует, когда делать самому, когда просить помощи, а когда искать другой способ решить задачу.",
      "Это тоже часть развития самостоятельности.",
    ],
    actions: [
      "Спокойно обозначьте ожидания: «Я знаю, что ты умеешь».",
      "Не спешите делать всё за ребёнка.",
      "Дайте время принять решение.",
      "Если нужно, предложите выбор: «Хочешь сам или вместе?»",
    ],
  },
];

function getReason(reasonId: ReasonId) {
  return reasons.find((reason) => reason.id === reasonId) ?? reasons[0];
}

function getNextReason(reasonId: ReasonId) {
  const index = reasons.findIndex((reason) => reason.id === reasonId);
  return reasons[index + 1];
}

function getStageIndex(screen: Screen) {
  if (screen.kind === "intro" || screen.kind === "help") return 0;
  if (screen.kind === "choice" || screen.kind === "thought") return 1;
  if (screen.kind === "check" || screen.kind === "reason") return 2;
  if (screen.kind === "actions") return 3;
  return 4;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>({ kind: "intro" });
  const [selectedThoughtId, setSelectedThoughtId] = useState<FirstThoughtId | null>(null);
  const selectedThought = firstThoughts.find((item) => item.id === selectedThoughtId) ?? firstThoughts[0];
  const isIntro = screen.kind === "intro";
  const image = isIntro ? hallwayScene : helpRequestScene;
  const imageAlt = isIntro
    ? "Ребёнок сидит в прихожей с ботинком в руках"
    : "Ребёнок смотрит на родителя и протягивает ботинок";
  const stageIndex = getStageIndex(screen);

  function chooseThought(thoughtId: FirstThoughtId) {
    setSelectedThoughtId(thoughtId);
    setScreen({ kind: "thought" });
  }

  function continueAfterNo(reasonId: ReasonId) {
    const nextReason = getNextReason(reasonId);
    setScreen(nextReason ? { kind: "check", reasonId: nextReason.id } : { kind: "final", tone: "unmatched" });
  }

  function renderContent() {
    if (screen.kind === "intro") {
      return (
        <>
          <h1 id="scene-title">Неужели сегодня придём в сад вовремя?</h1>
          <p>Мы уже почти вышли...</p>
          <p><strong>Что может пойти не так?</strong></p>
        </>
      );
    }

    if (screen.kind === "help") {
      return (
        <>
          <p className="dialogue-line" id="scene-title">— Мам, помоги...</p>
          <p>Ребёнок протягивает тебе ботинок и смотрит прямо в глаза.</p>
        </>
      );
    }

    if (screen.kind === "choice") {
      return (
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
      );
    }

    if (screen.kind === "thought") {
      return (
        <>
          <p className="thought-kicker">Ход мыслей</p>
          <p className="selected-thought" id="scene-title">💭 «{selectedThought.label}»</p>
          <h1>{selectedThought.title}</h1>
          <p>{selectedThought.text}</p>
          <p className="thought-note">{selectedThought.note}</p>
        </>
      );
    }

    if (screen.kind === "check") {
      const reason = getReason(screen.reasonId);

      return (
        <>
          {reason.transition && <p className="thought-note">{reason.transition}</p>}
          <h1 id="scene-title">{reason.question}</h1>
          <p>Подумайте, похоже ли это на ваше утро.</p>
          <ul className="prompt-list">
            {reason.prompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ul>
        </>
      );
    }

    if (screen.kind === "reason") {
      const reason = getReason(screen.reasonId);

      return (
        <>
          <p className="thought-kicker">Посмотрим шире</p>
          <h1 id="scene-title">{reason.title}</h1>
          {reason.explanation.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </>
      );
    }

    if (screen.kind === "actions") {
      const reason = getReason(screen.reasonId);

      return (
        <>
          <h1 id="scene-title">Что можно попробовать?</h1>
          <ul className="prompt-list">
            {reason.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </>
      );
    }

    if (screen.tone === "accepted") {
      return (
        <>
          <h1 id="scene-title">На сегодня этого достаточно.</h1>
          <p>Вы остановились не на первой мысли, а посмотрели на ситуацию шире.</p>
          <p>Даже если утром всё ещё будет сложно, такая пауза помогает реагировать спокойнее и точнее.</p>
        </>
      );
    }

    return (
      <>
        <h1 id="scene-title">Иногда ответ не находится сразу.</h1>
        <p>Причин может быть несколько, а иногда дело совсем в другой ситуации.</p>
        <p>Но уже сам переход от мысли «он просто вредничает» к вопросу «что может стоять за этим поведением?» помогает реагировать спокойнее.</p>
      </>
    );
  }

  function renderActions() {
    if (screen.kind === "intro") {
      return (
        <button className="primary-action" type="button" onClick={() => setScreen({ kind: "help" })}>
          Продолжить
        </button>
      );
    }

    if (screen.kind === "help") {
      return (
        <button className="primary-action" type="button" onClick={() => setScreen({ kind: "choice" })}>
          Что первым приходит тебе в голову?
        </button>
      );
    }

    if (screen.kind === "thought") {
      return (
        <button className="primary-action" type="button" onClick={() => setScreen({ kind: "check", reasonId: "energy" })}>
          Давайте проверим
        </button>
      );
    }

    if (screen.kind === "choice") {
      return null;
    }

    if (screen.kind === "check") {
      return (
        <div className="action-row">
          <button className="primary-action" type="button" onClick={() => setScreen({ kind: "reason", reasonId: screen.reasonId })}>
            Да, похоже
          </button>
          <button className="secondary-action" type="button" onClick={() => continueAfterNo(screen.reasonId)}>
            Нет, идём дальше
          </button>
        </div>
      );
    }

    if (screen.kind === "reason") {
      const nextReason = getNextReason(screen.reasonId);

      return (
        <div className="action-row">
          <button className="primary-action" type="button" onClick={() => setScreen({ kind: "actions", reasonId: screen.reasonId })}>
            Что можно сделать?
          </button>
          <button className="secondary-action" type="button" onClick={() => setScreen(nextReason ? { kind: "check", reasonId: nextReason.id } : { kind: "final", tone: "unmatched" })}>
            {nextReason ? "Посмотреть другие причины" : "Ни одна причина не подошла"}
          </button>
        </div>
      );
    }

    if (screen.kind === "actions") {
      const nextReason = getNextReason(screen.reasonId);

      return (
        <div className="action-row">
          <button className="primary-action" type="button" onClick={() => setScreen({ kind: "final", tone: "accepted" })}>
            Спасибо, буду пробовать
          </button>
          <button className="secondary-action" type="button" onClick={() => setScreen(nextReason ? { kind: "check", reasonId: nextReason.id } : { kind: "final", tone: "unmatched" })}>
            {nextReason ? "Это не очень похоже" : "Ни одна причина не подошла"}
          </button>
        </div>
      );
    }

    return (
      <button className="primary-action" type="button" onClick={() => {
        setSelectedThoughtId(null);
        setScreen({ kind: "intro" });
      }}>
        Начать сначала
      </button>
    );
  }

  return (
    <main className="story-shell">
      <section className="story-frame" data-screen={screen.kind} aria-label="Опять опаздываем">
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

        <section className="story-card" aria-labelledby="scene-title" key={`${screen.kind}-${"reasonId" in screen ? screen.reasonId : ""}-${"tone" in screen ? screen.tone : ""}`}>
          <div className="story-card-content">{renderContent()}</div>
          {renderActions()}
        </section>
      </section>
    </main>
  );
}
