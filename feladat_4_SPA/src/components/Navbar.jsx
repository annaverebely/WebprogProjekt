function Navbar({ menu, setMenu }) {
  return (
    <div className="spa-menu">
      <button
        className={menu === 'memory' ? 'menu-button active' : 'menu-button'}
        onClick={() => setMenu('memory')}
      >
        Memóriajáték
      </button>

      <button
        className={menu === 'quiz' ? 'menu-button active' : 'menu-button'}
        onClick={() => setMenu('quiz')}
      >
        Kvíz
      </button>
    </div>
  )
}

export default Navbar