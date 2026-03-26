import { useState } from 'react'

import farkas from '../assets/farkas.jpg'
import kuvik from '../assets/kuvik.jpg'
import hiuz from '../assets/hiúz.jpg'
import kovirigo from '../assets/kövirigó.jpg'
import lapipoc from '../assets/lápipóc.jpg'
import tarsza from '../assets/tarsza.jpg'
import szena from '../assets/szénalepke.jpg'
import sztyep from '../assets/sztyeplepke.jpg'
import vidra from '../assets/vidra.jpg'
import vizirigo from '../assets/vízirigó.webp'


const animals = [
  { name: 'Farkas', image: farkas },
  { name: 'Kuvik', image: kuvik },
  { name: 'Hiúz', image: hiuz },
  { name: 'Kövirigó', image: kovirigo },
  { name: 'Lápi póc', image: lapipoc },
  { name: 'Magyar tarsza', image: tarsza },
  { name: 'Szénalepke', image: szena },
  { name: 'Sztyeplepke', image: sztyep },
  { name: 'Vidra', image: vidra },
  { name: 'Vízi rigó', image: vizirigo }
]

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5)
}

function generateQuizQuestions() {
  const selected = shuffleArray(animals).slice(0, 6)

  return selected.map((animal) => {
    const wrong = shuffleArray(
      animals.filter((a) => a.name !== animal.name)
    )
      .slice(0, 3)
      .map((a) => a.name)

    return {
      image: animal.image,
      correct: animal.name,
      answers: shuffleArray([animal.name, ...wrong])
    }
  })
}

function Kviz() {
  const [questions, setQuestions] = useState(generateQuizQuestions())
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selected, setSelected] = useState(null)
  const [finished, setFinished] = useState(false)

  const q = questions[index]

  function handleAnswer(answer) {
    if (selected) return

    setSelected(answer)

    if (answer === q.correct) {
      setScore((prev) => prev + 1)
    }

    setTimeout(() => {
      if (index + 1 < questions.length) {
        setIndex((prev) => prev + 1)
        setSelected(null)
      } else {
        setFinished(true)
      }
    }, 900)
  }

  function restart() {
    setQuestions(generateQuizQuestions())
    setIndex(0)
    setScore(0)
    setSelected(null)
    setFinished(false)
  }

  if (finished) {
    return (
      <div className="game-box">
        <h2>Kvíz vége!</h2>
        <p>Pontszám: {score} / {questions.length}</p>

        <button className="menu-button" onClick={restart}>
          Új játék
        </button>
      </div>
    )
  }

  return (
    <div className="game-box">
      <h2>Felismered-e?</h2>

      <div className="quiz-image-box">
        <img src={q.image} alt="" className="quiz-image" />
      </div>

      <div className="quiz-answers">
        {q.answers.map((ans, i) => {
          let cls = 'quiz-button'

          if (selected) {
            if (ans === q.correct) cls += ' correct'
            else if (ans === selected) cls += ' wrong'
          }

          return (
            <button key={i} className={cls} onClick={() => handleAnswer(ans)}>
              {ans}
            </button>
          )
        })}
      </div>

      <p>Kérdés: {index + 1} / {questions.length}</p>
      <p>Pontszám: {score}</p>
    </div>
  )
}

export default Kviz