import { useState, useEffect } from 'react'
import './App.css'

import type { SubmitEvent, ChangeEvent} from 'react';
type TestCase = {id: string, name: string, status: Stat};
type Stat = 'passed' | 'failed' | 'pending';

function App() {
  const [casename, setCasename] = useState<string>('')
  const [cases, setCases] = useState<TestCase[]>(initCases);

  function initCases(): TestCase[]{
    const storedCase = localStorage.getItem('TestCases');
    if(storedCase === null){
      return [];
    }
    return JSON.parse(storedCase);
  }

  useEffect(() => {
    localStorage.setItem('TestCases', JSON.stringify(cases));
  }, [cases]);

  function updateCases(e: SubmitEvent<HTMLFormElement>, c: string){
    e.preventDefault();
    if(c.trim() === ''){return;}
    const newCase: TestCase = {
      id: crypto.randomUUID(),
      name: c,
      status: 'pending',
    }
    setCases(prev => [...prev, newCase]);
    setCasename('');
  }

  function updateStatus(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>, targetCase: TestCase){
    setCases(prev => prev.map(prevCase => {
      if(prevCase.id === targetCase.id){
        return {...prevCase, status: e.target.value as Stat};
      }
      return prevCase;
    }));
  }

  function removeCase(targetCase: TestCase){
    const ok = confirm(`Are you sure you want to remove ${targetCase.name}?\n(id: ${targetCase.id})`);
    if(!ok){return;} 
    setCases(prev => prev.filter(prevCase => prevCase.id !== targetCase.id))
  }

  function countCases(statStr: Stat){
    return cases.filter(c => c.status === statStr).length;
  }
  const passedCount = countCases('passed');
  const failedCount = countCases('failed')
  const pendingCount = countCases('pending');

  return (
    <>
      <h1>Test cases</h1>
      <div id='case-input'>
        <form onSubmit={e => updateCases(e, casename)}>
          <input value={casename} onChange={e => setCasename(e.target.value)}></input>
          <button>add</button>
        </form>
      </div>
      <div id='case-list'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TestCase</th>
              <th>Status</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((c) => 
            <tr key={c.id}>
              <td>{c.id.slice(0,5)}</td>
              <td>{c.name}</td>
              <td>
                <select value={c.status} onChange={e => updateStatus(e, c)}>
                  <option value='passed'>passed</option>
                  <option value='failed'>failed</option>
                  <option value='pending'>pending</option>
                </select>
              </td>
              <td>
                <button onClick={() => removeCase(c)}>remove</button>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      <div id='summary'>
        <table>
          <thead>
            <tr>
              <th>PASSED</th>
              <th>FAILED</th>
              <th>PENDING</th>
              <th>PASS RATE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{passedCount}</td>
              <td>{failedCount}</td>
              <td>{pendingCount}</td>
              <td>{cases.length > 0 ? `${Math.round(passedCount / cases.length * 100)} %` : '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
