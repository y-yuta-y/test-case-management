import { useState } from 'react'
import './App.css'

import type { SubmitEvent } from 'react';
type TestCase = {id: string, name: string, status: Stat};
type Stat = 'passed' | 'failed' | 'pending';

function App() {
  const [casename, setCasename] = useState<string>('')
  const [cases, setCases] = useState<TestCase[]>([]);

  function updateCases(e: SubmitEvent<HTMLFormElement>, c: string){
    e.preventDefault();
    if(c.trim() === ''){
      return;
    }
    const newCase: TestCase = {
      id: crypto.randomUUID(),
      name: c,
      status: 'pending',
    }
    setCases(prev => [...prev, newCase]);
    setCasename('');
  }

  return (
    <>
      <h1>Test cases</h1>
      <div>
        <form onSubmit={e => updateCases(e, casename)}>
          <input value={casename} onChange={e => setCasename(e.target.value)}></input>
          <button>add</button>
        </form>

      </div>
    </>
  )
}

export default App
