import Header from './components/Header'
import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-flag-white font-body leading-relaxed text-text">
      <Header />

      <main>
        <Hero />
      </main>
    </div>
  )
}

export default App