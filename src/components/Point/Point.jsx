import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Point({ defaultPoint, showPoint = false }) {
  const [point, setPoint] = useState(defaultPoint ?? 0);

  function handleClick(incrementPoint) {
    setPoint(point + incrementPoint);
  }

  return (
    <div style={{ opacity: showPoint ? 1 : 0 }}>
      <div className={styles.point}>{point}</div>
      <div className={styles.buttons}>
        <button
          type='button'
          onClick={() => handleClick(1)}
          className={styles.buttonPlus1}
        >
          + 1
        </button>
        <button
          type='button'
          onClick={() => handleClick(2)}
          className={styles.buttonPlus2}
        >
          + 2
        </button>
        <button
          type='button'
          onClick={() => handleClick(3)}
          className={styles.buttonPlus3}
        >
          + 3
        </button>
        <button
          type='button'
          onClick={() => handleClick(-1)}
          className={styles.buttonMinus1}
        >
          - 1
        </button>
      </div>
    </div>
  );
}
