import { useState } from 'react'
import './App.css'
import { Statistics } from './Statistics';
import { Button } from './Button';
import { Anecdotes } from './Anecdotes';

function App() {
  const[feedback, setFeedback] = useState({good: 0, nuetral: 0, bad: 0});
  const [stats, setStats] = useState({all: 0, average: 0, positive: 0});

  const handleGoodFeedback = () => {
    const good: number = feedback.good+1;
    const updatedFeedback = {...feedback, good};
    const total: number = sumFeedback(...Object.values(updatedFeedback));
    const average: number = calcAvg(good, feedback.bad, total);
    const positive: number = good/total;

    setFeedback(updatedFeedback);
    setStats({positive, average, all: total});
  };

  const handleNuetralFeedback = () => {
    const updatedFeedback = {...feedback, nuetral: feedback.nuetral+1};
    const all: number = sumFeedback(...Object.values(updatedFeedback));
    const average: number = calcAvg(feedback.good, feedback.bad, all);
    const positive: number = feedback.good/all;
    setFeedback(updatedFeedback);
    setStats({all, average, positive});
  };

  const handleBadFeedback = () => {
    const bad: number = feedback.bad+1;
    const updatedFeedback = {...feedback, bad};
    const all: number = sumFeedback(...Object.values(updatedFeedback));
    const average: number = calcAvg(feedback.good, bad, all);
    const positive: number = feedback.good/all;
    setFeedback(updatedFeedback);
    setStats({positive, average, all});

  };
  const sumFeedback = (...feedback: number[]): number => feedback.reduce((a, b) => a + b);
  const calcAvg = (good: number, bad: number, all: number): number => (good - bad)/all;

  return (
    <>
      <Anecdotes/>
      <h1> give feedback</h1>
      <Button handleClick={handleGoodFeedback} label='good'/>
      <Button handleClick={handleNuetralFeedback} label='nuetral'/>
      <Button handleClick={handleBadFeedback} label='bad'/>
      <h2>Statistics</h2>
        {stats.all === 0 ? <p>No feedback given</p> :
          <div>
            <ul>
              <li>good {feedback.good}</li>
              <li>nuetral {feedback.nuetral}</li>
              <li>bad {feedback.bad}</li> 
            </ul>
            <Statistics statistics={stats}/>
          </div>
        }
    </>
  )
}

export default App
