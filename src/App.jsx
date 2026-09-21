import { useEffect, useMemo, useRef, useState } from 'react'

const MORSE = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.', G: '--.', H: '....',
  I: '..', J: '.---', K: '-.-', L: '.-..', M: '--', N: '-.', O: '---', P: '.--.',
  Q: '--.-', R: '.-.', S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
}

const WORDS = [
  'CODE', 'DATA', 'BINARY', 'SERVER', 'NETWORK', 'PYTHON', 'PROGRAM', 'ROBOT', 'DATABASE', 'ALGORITHM',
  'ATOM', 'CELL', 'ENERGY', 'GRAVITY', 'PHOTON', 'NEURON', 'QUANTUM', 'OXYGEN', 'ELECTRON', 'MOLECULE',
  'CIRCUIT', 'VOLTAGE', 'CURRENT', 'RESISTOR', 'SENSOR', 'TURBINE', 'MOTOR', 'BATTERY', 'FRICTION', 'PRESSURE',
]

const toMorse = (word) => word.split('').map((letter) => MORSE[letter])

function App() {
  const [word, setWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)])
  const [answer, setAnswer] = useState('')
  const [message, setMessage] = useState(null)
  const inputRef = useRef(null)
  const morseLetters = useMemo(() => toMorse(word), [word])

  useEffect(() => { inputRef.current?.focus() }, [word])

  function checkAnswer(event) {
    event.preventDefault()
    if (!answer.trim()) {
      setMessage({ type: 'error', text: 'Type your answer first.' })
      return
    }
    setMessage(answer.trim().toUpperCase() === word
      ? { type: 'success', text: 'Correct! Great decoding.' }
      : { type: 'error', text: 'Not quite — try again.' })
  }

  function randomize() {
    const choices = WORDS.filter((item) => item !== word)
    setWord(choices[Math.floor(Math.random() * choices.length)])
    setAnswer('')
    setMessage(null)
  }

  return (
    <main className="page-shell">
      <div className="glow glow-one" />
      <div className="glow glow-two" />
      <section className="challenge-card" aria-labelledby="page-title">
        <header>
          <p className="eyebrow"><span aria-hidden="true">• — • —</span> SIGNAL INCOMING <span aria-hidden="true">— • — •</span></p>
          <h1 id="page-title">Morse Code <em>Challenge</em></h1>
          <p className="intro">Decode the transmission and type the hidden word.</p>
        </header>

        <div className="decoder" aria-label="Morse code to decode">
          <span className="decoder-label">TRANSMISSION</span>
          <p className="morse-code" aria-label="Morse code letters">
            {morseLetters.map((letters, index) => (
              <span className="morse-group" key={`${letters}-${index}`}>
                {index > 0 && <span className="morse-divider" aria-hidden="true" />}
                <span>{letters}</span>
              </span>
            ))}
          </p>
          <p className="hint">Each group is one letter</p>
        </div>

        <form onSubmit={checkAnswer}>
          <label htmlFor="answer">What does it say?</label>
          <div className="answer-row">
            <input
              ref={inputRef}
              id="answer"
              value={answer}
              onChange={(event) => { setAnswer(event.target.value); if (message) setMessage(null) }}
              placeholder="TYPE YOUR ANSWER"
              autoComplete="off"
              spellCheck="false"
              aria-describedby={message ? 'result' : undefined}
            />
            <button className="check-button" type="submit">Check</button>
          </div>
        </form>

        <div id="result" className={`result ${message?.type ?? ''}`} aria-live="polite">
          {message?.text}
        </div>

        <button className="random-button" type="button" onClick={randomize}>
          <span aria-hidden="true">↻</span> Randomize challenge
        </button>
      </section>
    </main>
  )
}

export default App
