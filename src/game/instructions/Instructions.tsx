import React, { useState } from "react";
import { Modal } from "../../modal/Modal";
import styles from "./Instructions.module.css";

export function Instructions() {
  const [listVisible, setListVisible] = useState<boolean>();
  const toggleListVisible = () => setListVisible((prev) => !prev);

  return (
    <div className={styles.instructions}>
      <button onClick={toggleListVisible} className={styles.howToPlay}>
        How to play
      </button>
      {listVisible && (
        <Modal
          title="How to play"
          content={
            <ul>
              <li>
                <p>Movement:</p>
                <span>Control your Jedi icon with the arrow keys.</span>
              </li>

              <li>
                <p>Objective:</p>
                <span>
                  Collect the lightsaber to become powerful. Capture all the
                  Darth Vaders to win. Avoid stepping into fiery zones.
                </span>
              </li>

              <li>
                <p>Challenge:</p>
                <span>
                  Adapt to ever-changing layouts for added excitement.
                </span>
              </li>

              <li>
                <p>Victory:</p>
                <span>
                  Collect Jedi star at the end for a successful round.
                </span>
              </li>

              <li>
                <p>Caution:</p>
                <span>Game ends if you step into fire.</span>
              </li>
            </ul>
          }
          onClose={toggleListVisible}
        ></Modal>
      )}
    </div>
  );
}
