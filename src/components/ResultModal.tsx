import { useImperativeHandle, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";

interface ResultModalProps {
  targetTime: number;
  remainingTime: number;
  onReset: () => void;
}

const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }: ResultModalProps, ref) => {
    const dialog = useRef<HTMLDialogElement | null>(null);

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => ({
      open() {
        dialog.current?.showModal();
      },
    }));

    return createPortal(
      <dialog ref={dialog} className="result-modal">
        {userLost && <h2>You lost</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>
          The target time was <strong>{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")!
    );
  }
);

export default ResultModal;
