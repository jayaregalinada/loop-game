import React from 'react';
import styles from './styles.module.css';

export default function Box({
  backgroundColor,
  colorName,
  description,
  highlight,
  showDescription = false,
}) {
  function resolveStyleBox() {
    if (highlight) {
      return {
        ...resolveStyle(),
        boxShadow: `0 0 3rem 0.5rem ${backgroundColor ?? '#FFF'}`,
        transform: 'scale(1.1)',
        opacity: 1,
      };
    }

    return resolveStyle();
  }

  function resolveStyle() {
    const defaultStyle = {
      backgroundColor: backgroundColor ?? '#FFF',
      color: '#FFF',
      borderColor: backgroundColor ?? '#FFF',
    };

    if (['white', 'yellow'].includes(backgroundColor)) {
      return {
        ...defaultStyle,
        color: '#000',
      };
    }

    if (backgroundColor === 'none') {
      return {
        ...defaultStyle,
        borderColor: '#FFF',
      };
    }

    return defaultStyle;
  }

  return (
    <div>
      <div className={styles.box} style={resolveStyleBox()}>
        <strong>{colorName.toUpperCase()}</strong>
      </div>
      {showDescription && (
        <div style={resolveStyle()} className={styles.description}>
          {description}
        </div>
      )}
    </div>
  );
}
