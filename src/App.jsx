import Header from './components/Header'
import MainContent from './components/MainContent'
import Testimonials from './components/Testimonials'

function App() {
  return (
    <div className="min-h-screen bg-flag-white font-body leading-relaxed text-text">
      <Header />
      <MainContent />
      <Testimonials />
    </div>
  )
}

export default App