import { useState } from 'react'

// 10 állat
const animals = [
  'Lápi póc',
  'Hiúz',
  'Vidra',
  'Fehér Gólya',
  'Farkas',
  'Uhu',
  'Magyar tarsza',
  'Pisze denevér',
  'Parlagi vipera',
  'Gyurgyalag'
]

// kártyák létrehozása (duplázás + keverés)
function createCards() {
  return [...animals, ...animals]
    .map((name, index) => ({
      id: index,
      name,
      flipped: false,
      matched: false
    }))
    .sort(() => Math.random() - 0.5)
}

function Memoria() {
  const [cards, setCards] = useState(createCards())
  const [selectedCards, setSelectedCards] = useState([])
  const [moves, setMoves] = useState(0)

  function handleCardClick(clickedCard) {
    // ha már fel van fordítva vagy kész van, ne csináljon semmit
    if (
      clickedCard.flipped ||
      clickedCard.matched ||
      selectedCards.length === 2
    ) {
      return
    }

    // felfordítjuk a kártyát
    const updatedCards = cards.map((card) =>
      card.id === clickedCard.id ? { ...card, flipped: true } : card
    )

    const newSelectedCards = [...selectedCards, clickedCard]

    setCards(updatedCards)
    setSelectedCards(newSelectedCards)

    // ha 2 lap ki van választva
    if (newSelectedCards.length === 2) {
      setMoves((prev) => prev + 1)

      const [first, second] = newSelectedCards

      // ha pár
      if (first.name === second.name) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.name === first.name
                ? { ...card, matched: true }
                : card
            )
          )
          setSelectedCards([])
        }, 500)
      } else {
        // ha nem pár
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          )
          setSelectedCards([])
        }, 800)
      }
    }
  }

  function restartGame() {
    setCards(createCards())
    setSelectedCards([])
    setMoves(0)
  }

  const allMatched = cards.every((card) => card.matched)

  return (
    <div>
      <h2>Memóriajáték</h2>
      <p>Találd meg az összetartozó állatpárokat!</p>
      <p>Lépések száma: {moves}</p>

      <div className="memory-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className="memory-card"
            onClick={() => handleCardClick(card)}
          >
            {card.flipped || card.matched ? card.name : '?'}
          </button>
        ))}
      </div>

      {allMatched && <p>Gratulálok, minden párt megtaláltál!</p>}

      <button className="menu-button" onClick={restartGame}>
  Új játék
</button>
    </div>
  )
}

export default Memoria