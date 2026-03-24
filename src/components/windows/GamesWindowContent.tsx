"use client";

import { useMemo, useState } from "react";
import styles from "./WindowApps.module.css";

type Guess = "truth" | "lie" | null;

const OPTIONS = [
  {
    id: "hire",
    label: "You really want to hire me",
    correct: "truth",
  },
  {
    id: "onboard",
    label: "You really want to onboard me",
    correct: "truth",
  },
  {
    id: "other-candidate",
    label: "You'd rather move forward with another candidate",
    correct: "lie",
  },
] as const;

export default function GamesWindowContent() {
  const [guesses, setGuesses] = useState<Record<string, Guess>>({
    hire: null,
    onboard: null,
    "other-candidate": null,
  });
  const [hasChecked, setHasChecked] = useState(false);

  const allAssigned = useMemo(
    () => OPTIONS.every((option) => guesses[option.id]),
    [guesses]
  );

  const isCorrect = useMemo(
    () => OPTIONS.every((option) => guesses[option.id] === option.correct),
    [guesses]
  );

  const setGuess = (id: string, value: Exclude<Guess, null>) => {
    setHasChecked(false);
    setGuesses((current) => ({ ...current, [id]: value }));
  };

  return (
    <div>
      <div className={styles.menuBar}>
        {["Game", "Options", "Help"].map((item) => (
          <span key={item} className={styles.menuItem}>
            {item}
          </span>
        ))}
      </div>

      <section className={styles.gamePanel}>
        <div className={styles.gameHeader}>
          <p className={styles.gameEyebrow}>Games</p>
          <h3 className={styles.gameTitle}>2 Truths, 1 Lie</h3>
          <p className={styles.gameInstruction}>
            Mark each statement as either Truth or Lie, then check your answer.
          </p>
        </div>

        <div className={styles.gameOptionList} role="group" aria-label="Two truths and one lie">
          {OPTIONS.map((option) => {
            const guess = guesses[option.id];
            const rowClassNames = [styles.gameOption];

            if (guess) rowClassNames.push(styles.gameOptionSelected);
            if (hasChecked) {
              rowClassNames.push(
                option.correct === "truth" ? styles.gameOptionTruth : styles.gameOptionLie
              );
            }

            return (
              <div key={option.id} className={rowClassNames.join(" ")}>
                <div className={styles.gameOptionText}>{option.label}</div>

                <div className={styles.gameChoiceRow}>
                  <button
                    type="button"
                    className={`${styles.gameChoiceButton} ${
                      guess === "truth" ? styles.gameChoiceButtonTruthActive : ""
                    }`}
                    onClick={() => setGuess(option.id, "truth")}
                    aria-pressed={guess === "truth"}
                  >
                    Truth
                  </button>

                  <button
                    type="button"
                    className={`${styles.gameChoiceButton} ${
                      guess === "lie" ? styles.gameChoiceButtonLieActive : ""
                    }`}
                    onClick={() => setGuess(option.id, "lie")}
                    aria-pressed={guess === "lie"}
                  >
                    Lie
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.gameFooter}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.actionButtonPrimary}`}
            onClick={() => setHasChecked(true)}
            disabled={!allAssigned}
          >
            Check Answer
          </button>

          {hasChecked ? (
            <div className={styles.gameResultBlock}>
              {isCorrect ? (
                <>
                  <div className={styles.gameConfetti} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <p className={`${styles.gameFeedback} ${styles.gameFeedbackSuccess}`}>
                    CONGRATULATIONS?
                  </p>
                </>
              ) : (
                <p className={`${styles.gameFeedback} ${styles.gameFeedbackFail}`}>
                  Womp Womp try again!
                </p>
              )}
            </div>
          ) : (
            <p className={styles.gameHint}>
              {Object.values(guesses).filter(Boolean).length}/3 marked
            </p>
          )}
        </div>
      </section>

      <div className={styles.statusBar}>
        <span>Optional side feature</span>
        <span>Games folder</span>
      </div>
    </div>
  );
}
