import React from 'react';
import Point from '../Point/Point';
import styles from './styles.module.css';

export default function List({
  items,
  playerIndex,
  groupIndex,
  showPoint = false,
}) {
  function resolveStyle(item, index) {
    const isHighlighted = playerIndex === index && groupIndex == item.group;

    if (isHighlighted) {
      return {
        backgroundColor: '#FFF',
        color: '#000',
      };
    }

    return {};
  }

  function member(items, index) {
    return (
      <div key={index}>
        <Point showPoint={showPoint} />
        <h4 className={styles.groupName}>Group {index + 1}</h4>
        <ul className={styles.items}>
          {items.map((item, itemIndex) => (
            <li
              style={resolveStyle(item, itemIndex)}
              className={[
                styles.item,
                playerIndex === itemIndex && groupIndex == item.group
                  ? styles.itemActive
                  : null,
              ].join(' ')}
              key={`${item.name}-${item.index}-${itemIndex}`}
            >
              <strong>{item.name}</strong>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return <div className={styles.groups}>{items.map(member)}</div>;
}
