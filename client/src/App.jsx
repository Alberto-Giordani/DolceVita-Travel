import { Routes, Route } from 'react-router'
import Header from './components/Header'
import MainContent from './components/MainContent'
import TourDetails from './components/TourDetails'
import Footer from './components/Footer'

function App() {
    return (
        <div className="min-h-screen bg-flag-white font-body leading-relaxed text-text">
            <Header />

            <Routes>
                <Route
                    path="/"
                    element={<MainContent />}
                />

                <Route
                    path="/tours/:slug"
                    element={<TourDetails />}
                />

                <Route
                    path="*"
                    element={
                        <main className="mx-auto max-w-290 px-4 py-14">
                            <h1 className="mb-6 font-heading text-4xl">
                                Page not found
                            </h1>

                            <a
                                href="/"
                                className="font-bold text-flag-red underline"
                            >
                                Return to the homepage
                            </a>
                        </main>
                    }
                />
            </Routes>

            <Footer />
        </div>
    )
}

export default App