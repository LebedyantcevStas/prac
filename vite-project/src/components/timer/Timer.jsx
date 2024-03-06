import { useEffect, useState } from 'react';
import './style.css';

const workBreak = {
  work: 2100,
  break: 900,
  bigBreak: 1500,
};

export const Timer = () => {
  const [time, setTime] = useState(workBreak.work);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [iter, setIter] = useState(1);
  const [tasks, setTasks] = useState([]);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };
  const handleTabClick = (type) => {
    setIsActive(false);
    let totalT = workBreak.work;
    if (type === 'break') {
      totalT = workBreak.break;
    } else if (type === 'bigBreak') {
      totalT = workBreak.bigBreak;
    }

    setTime(totalT);
  };
  useEffect(() => {
    const refreshIntervalId = setInterval(() => {
      if (isActive) {
        setTime((prev) => prev - 1);
        if (time === 0) {
          if ((iter + 1) % 8 === 0) {
            handleTabClick('bigBreak');
          } else if (iter % 2 === 0) {
            handleTabClick('work');
          } else {
            handleTabClick('break');
          }
          setIter((prev) => prev + 1);
        }
      }
    }, 1000);

    return () => clearInterval(refreshIntervalId);
  }, [isActive, iter, time]);

  return (
    <div className="box">
      <ul className="taskList">
        {tasks.slice(Math.floor(iter / 2) + 1).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="timer">
        <div className="tub__box">
          <button
            className="button_tub"
            onClick={() => {
              handleTabClick('work');
            }}
          >
            занятие
          </button>
          <button
            className="button_tub"
            onClick={() => {
              handleTabClick('break');
            }}
          >
            перерыв
          </button>
          <button
            className="button_tub"
            onClick={() => {
              handleTabClick('bigBreak');
            }}
          >
            большой перерыв
          </button>
        </div>

        <h1>
          {Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : Math.floor(time / 60)}
          :{time % 60 < 10 ? `0${time % 60}` : time % 60}
        </h1>
        <div className="button_box">
          {!isActive ? (
            <button className="button_time" onClick={handleClick}>
              Запустить
            </button>
          ) : (
            <>
              <button className="button_time" onClick={handleClick}>
                Пауза
              </button>
              <button className="=>" onClick={() => setTime(0)}>
                Закончить
              </button>
            </>
          )}
        </div>
        {iter % 2 === 1 && tasks[Math.floor(iter / 2)] && (
          <h3 className="iteration">{tasks[Math.floor(iter / 2)]}</h3>
        )}

        <input
          className="addText"
          type="text"
          onInput={(e) => setTaskName(e.target.value)}
          value={taskName}
        />

        <button
          className="button_time"
          onClick={() => {
            setTasks((prev) => [...prev, taskName]);
            setTaskName('');
          }}
        >
          Add task +
        </button>
      </div>
    </div>
  );
};
