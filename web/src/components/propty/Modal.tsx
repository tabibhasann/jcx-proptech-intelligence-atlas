"use client";
import { useEffect, useRef, useState, type KeyboardEventHandler } from "react";
import { Icon } from "./Icon";

export function Modal({
  title,
  children,
  onClose,
  wide = false,
  variant,
  onKeyDown,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
  variant?: "photo" | "compare";
  onKeyDown?: KeyboardEventHandler<HTMLDialogElement>;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closing = useRef(false);
  const [isClosing, setIsClosing] = useState(false);
  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setIsClosing(true);
    timer.current = setTimeout(onClose, 220);
  };
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.showModal();
    return () => {
      if (timer.current) clearTimeout(timer.current);
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`pt-dialog ${wide ? "pt-dialog-wide" : ""} ${variant ? `pt-dialog-${variant}` : ""} ${isClosing ? "pt-dialog-closing" : ""}`}
      aria-labelledby="pt-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="pt-dialog-inner">
        <header className="pt-dialog-head">
          <h2 id="pt-dialog-title">{title}</h2>
          <button
            className="pt-icon-button"
            aria-label="Close dialog"
            onClick={requestClose}
          >
            <Icon name="close" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  );
}
