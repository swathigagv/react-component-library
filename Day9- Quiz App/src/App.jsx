import { useEffect, useState } from 'react'
import './App.css'
import { QUESTIONS, TIME_PER_QUESTION } from './questions.js'

function App() {
  const [stage, setStage] = useState('start') // 'start' | 'playing' | 'finished'
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION)

  const question = QUESTIONS[currentIndex]
  const isAnswered = selected !== null
  const isLastQuestion = currentIndex === QUESTIONS.length - 1

  // Countdown timer for the current question. Stops once an answer is
  // locked in, and auto-advances (as unanswered) if it hits zero.
  useEffect(() => {
    if (stage !== 'playing' || isAnswered) return undefined

    if (timeLeft === 0) {
      lockAnswer(null)
      return undefined
    }

    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [stage, timeLeft, isAnswered])

  const startQuiz = () => {
    setStage('playing')
    setCurrentIndex(0)
    setAnswers([])
    setSelected(null)
    setTimeLeft(TIME_PER_QUESTION)
  }

  const lockAnswer = (optionIndex) => {
    if (isAnswered) return
    setSelected(optionIndex)
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        selectedIndex: optionIndex,
        correct: optionIndex === question.correctIndex,
      },
    ])
  }

  const nextQuestion = () => {
    if (isLastQuestion) {
      setStage('finished')
      return
    }
    setCurrentIndex((i) => i + 1)
    setSelected(null)
    setTimeLeft(TIME_PER_QUESTION)
  }

  const score = answers.filter((a) => a.correct).length
  const percentage = Math.round((score / QUESTIONS.length) * 100)

  return (
    <main className="app">
      {stage === 'start' && <StartScreen onStart={startQuiz} />}

      {stage === 'playing' && (
        <PlayingScreen
          question={question}
          index={currentIndex}
          total={QUESTIONS.length}
          timeLeft={timeLeft}
          selected={selected}
          isAnswered={isAnswered}
          isLastQuestion={isLastQuestion}
          onSelect={lockAnswer}
          onNext={nextQuestion}
        />
      )}

      {stage === 'finished' && (
        <ResultsScreen
          score={score}
          total={QUESTIONS.length}
          percentage={percentage}
          answers={answers}
          onRestart={startQuiz}
        />
      )}
    </main>
  )
}

function StartScreen({ onStart }) {
  return (
    <div className="screen">
      <span className="app__eyebrow">React + Vite</span>
      <h1 className="app__title">Quiz App</h1>
      <p className="app__subtitle">
        {QUESTIONS.length} questions · {TIME_PER_QUESTION}s each · test your React basics
      </p>
      <button className="btn btn--primary btn--wide" onClick={onStart}>
        Start Quiz
      </button>
    </div>
  )
}

function PlayingScreen({
  question,
  index,
  total,
  timeLeft,
  selected,
  isAnswered,
  isLastQuestion,
  onSelect,
  onNext,
}) {
  const progress = ((index + 1) / total) * 100
  const isLowTime = timeLeft <= 5 && !isAnswered

  return (
    <div className="screen">
      <div className="progress">
        <div className="progress__track">
          <div className="progress__fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="progress__meta">
          <span>
            Question {index + 1} of {total}
          </span>
          <span className={`progress__timer ${isLowTime ? 'progress__timer--low' : ''}`}>
            ⏱ {timeLeft}s
          </span>
        </div>
      </div>

      <h2 className="question">{question.question}</h2>

      <ul className="options">
        {question.options.map((option, i) => {
          let state = ''
          if (isAnswered) {
            if (i === question.correctIndex) state = 'options__btn--correct'
            else if (i === selected) state = 'options__btn--wrong'
          }
          return (
            <li key={i}>
              <button
                className={`options__btn ${state}`}
                onClick={() => onSelect(i)}
                disabled={isAnswered}
              >
                <span className="options__letter">{String.fromCharCode(65 + i)}</span>
                {option}
              </button>
            </li>
          )
        })}
      </ul>

      {isAnswered && (
        <button className="btn btn--primary btn--wide" onClick={onNext}>
          {isLastQuestion ? 'See results' : 'Next question'}
        </button>
      )}
    </div>
  )
}

function ResultsScreen({ score, total, percentage, answers, onRestart }) {
  const verdict =
    percentage === 100
      ? 'Perfect score!'
      : percentage >= 70
        ? 'Nice work!'
        : percentage >= 40
          ? 'Good effort.'
          : 'Keep practicing.'

  return (
    <div className="screen">
      <span className="app__eyebrow">Results</span>
      <h1 className="app__title">
        {score} / {total}
      </h1>
      <p className="app__subtitle">
        {percentage}% correct · {verdict}
      </p>

      <ul className="review">
        {QUESTIONS.map((q, i) => {
          const answer = answers[i]
          return (
            <li key={q.id} className="review__item">
              <span className={`review__icon ${answer?.correct ? 'review__icon--correct' : 'review__icon--wrong'}`}>
                {answer?.correct ? '✓' : '✕'}
              </span>
              <div className="review__body">
                <span className="review__question">{q.question}</span>
                <span className="review__answer">
                  Correct answer: {q.options[q.correctIndex]}
                </span>
              </div>
            </li>
          )
        })}
      </ul>

      <button className="btn btn--primary btn--wide" onClick={onRestart}>
        Try again
      </button>
    </div>
  )
}

export default App