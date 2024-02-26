import React, {
  Children,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Modal.module.css";

interface ActionButton {
  content: string;
  onAction: () => void;
}

interface Props {
  content: React.ReactNode;
  onClose: () => void;
  title?: string;
  primaryAction?: ActionButton;
  hideCloseButton?: boolean;
}

export function Modal({
  content,
  onClose,
  title,
  hideCloseButton,
  primaryAction,
}: Props) {
  const ref = useRef<HTMLDivElement>();
  const closeBtnRef = useRef<HTMLButtonElement>();
  const primaryActionBtnRef = useRef<HTMLButtonElement>();
  useEffect(() => {
    primaryAction
      ? primaryActionBtnRef.current.focus()
      : closeBtnRef.current?.focus();
  }, []);

  function handleClick(e: MouseEvent) {
    if (!ref.current.contains(e.target as Node)) {
      onClose();
    }
  }
  return (
    <div className={styles.container} onClick={handleClick}>
      <div ref={ref} className={styles.modal}>
        {title && <h2>{title}</h2>}
        {content}
        <div className={styles.buttonGroup}>
          {primaryAction && (
            <button
              ref={primaryActionBtnRef}
              onClick={primaryAction.onAction}
              className={styles.actionBtn}
            >
              {primaryAction.content}
            </button>
          )}
          {!hideCloseButton && (
            <button
              ref={closeBtnRef}
              className={styles.actionBtn}
              onClick={onClose}
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
