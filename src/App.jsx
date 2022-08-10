import React, { useEffect, useState } from 'react';
import './App.css';
import List from './components/List';
import defaultStudents from './defaultStudents';
import { chunk, shuffle } from 'lodash-es';
import Box from './components/Box';
import FullScreen from './components/FullScreen';

export default function App() {
  const [students, setStudents] = useState([]);
  const [groupStudents, setGroupStudents] = useState([]);
  const [count, setCount] = useState(0);
  const [textarea, setTextarea] = useState(defaultStudents.join('\n'));
  const [groupCounter, setGroupCounter] = useState(3);
  const [toggleForm, setToggleForm] = useState(true);
  const [toggleDescription, setToggleDescription] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const colors = [
    {
      colorName: 'green',
      backgroundColor: 'green',
      description: '3 Points',
    },
    {
      colorName: 'blue',
      backgroundColor: 'blue',
      description: '1 Point',
    },
    {
      colorName: 'grey',
      backgroundColor: 'grey',
      description: '1 Point',
    },
    {
      colorName: 'red',
      backgroundColor: 'red',
      description: '-1 Point',
    },
    {
      colorName: 'yellow',
      backgroundColor: 'yellow',
      description: '2 Points',
    },
    {
      colorName: 'white',
      backgroundColor: 'white',
      description: '1 Point',
    },
    {
      colorName: 'black',
      backgroundColor: 'black',
      description: '2 Points',
    },
    {
      colorName: 'purple',
      backgroundColor: 'purple',
      description: '-1 Point',
    },
  ];
  const [boxIndex, setBoxIndex] = useState();
  const [playerIndex, setPlayerIndex] = useState();
  const [groupIndex, setGroupIndex] = useState();

  useEffect(() => {
    if (startGame) {
      // const nextPlayer = playerIndex < students.length - 1 ? playerIndex + 1 : 0;
      nextGroupIndex();
      // setGroupIndex();
      const nextPlayer = Math.ceil(
        Math.random() * groupStudents[groupIndex].length - 1
      );
      setPlayerIndex(nextPlayer);
      console.log();
    }
  }, [boxIndex]);

  function start() {
    setStartGame(true);
    const newGroupIndex = Math.floor(
      Math.random() * (groupStudents.length - 1)
    );
    setGroupIndex(newGroupIndex);
    startBoxIndexIn();
  }

  function stop() {
    setStartGame(false);
  }

  function startBoxIndexIn() {
    setBoxIndex((Math.random() * colors.length) | 0);
  }

  function nextGroupIndex() {
    setGroupIndex(groupIndex < groupStudents.length - 1 ? groupIndex + 1 : 0);
  }
  function nextBox() {
    setBoxIndex(boxIndex < colors.length - 1 ? boxIndex + 1 : 0);
  }

  function addStudents() {
    const studentsRaw = shuffle(textarea.trim().split('\n'));

    const newStudents = studentsRaw.map((name, index) => {
      return {
        name,
        index,
      };
    });

    setStudents(newStudents);

    const count = Math.ceil(studentsRaw.length / groupCounter);
    const theStudents = chunk(newStudents, count);

    const newStudentGroup = theStudents.map((group, groupIndex) => {
      return group.map((student) => {
        return { ...student, group: groupIndex };
      });
    });

    setGroupStudents(newStudentGroup);
    setToggleForm(!toggleForm);
  }

  return (
    <div className='App'>
      <div className='boxes'>
        {colors.map((color, index) => (
          <Box
            key={index}
            {...color}
            highlight={index === boxIndex}
            showDescription={toggleDescription}
          />
        ))}
      </div>
      <div className='players'>
        <List
          items={groupStudents}
          showPoint={toggleDescription}
          playerIndex={playerIndex}
          groupIndex={groupIndex}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setToggleForm(!toggleForm)}>
            {toggleForm ? 'Hide' : 'Show'} Form
          </button>
          <button type='button' onClick={() => nextBox()}>
            Next Box ➡️
          </button>
          <button
            type='button'
            onClick={() => setToggleDescription(!toggleDescription)}
          >
            {toggleDescription ? 'Hide' : 'Show'} Description
          </button>
          <button
            type='button'
            style={{
              color: '#FFF',
              backgroundColor: startGame ? 'red' : 'green',
            }}
            onClick={() => (startGame ? stop() : start())}
          >
            {startGame ? 'Stop' : 'Start'} Game
          </button>
        </div>
        {toggleForm && (
          <div>
            <div>
              <textarea
                value={textarea}
                name='students'
                cols='30'
                rows='15'
                onChange={(e) => setTextarea(e.target.value)}
              ></textarea>
            </div>
            <div>
              <input
                type='number'
                value={groupCounter}
                onChange={(e) => setGroupCounter(e.target.value)}
              />
            </div>
            <div>
              <button
                type='button'
                className='generate-players'
                onClick={addStudents}
              >
                Generate Players
              </button>
            </div>
          </div>
        )}
      </div>
      <FullScreen />
    </div>
  );
}
