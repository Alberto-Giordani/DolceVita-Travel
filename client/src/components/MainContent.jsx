import { useEffect, useState } from 'react'
import Hero from './Hero'
import TourCard from './TourCard'
import Testimonials from './Testimonials'
import PlanYourTrip from './PlanYourTrip'

const categories = ['All', 'Cities', 'Coast']

function MainContent() {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [filter, setFilter] = useState('All')

    useEffect(() => {
        let ignore = false

        async function loadTours() {
            try {
                const response = await fetch('/api/tours')

                if (!response.ok) {
                    throw new Error('Unable to load tours')
                }

                const data = await response.json()

                if (!ignore) {
                    setTours(data)
                }
            } catch {
                if (!ignore) {
                    setError(
                        'Tours could not be loaded. Please refresh and try again.'
                    )
                }
            } finally {
                if (!ignore) {
                    setLoading(false)
                }
            }
        }

        loadTours()

        return () => {
            ignore = true
        }
    }, [])

    const visibleTours =
        filter === 'All'
            ? tours
            : tours.filter((tour) => tour.category === filter)

    return (
        <main>
            <Hero />

            <section
                id="tours"
                className="mx-auto max-w-290 px-4 py-14"
            >
                <p className="mb-3 text-xs font-bold tracking-[0.14em] text-flag-red uppercase">
                    Find your Italian escape
                </p>

                <h2 className="mb-8 font-heading text-3xl leading-[1.15] lg:text-[2.5rem]">
                    Six ways to fall in love with Italy.
                </h2>

                <div
                    role="group"
                    aria-label="Filter tours by category"
                    className="mb-6 flex flex-wrap gap-3"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            aria-pressed={filter === category}
                            onClick={() => setFilter(category)}
                            className={`cursor-pointer rounded-md border border-flag-green bg-flag-white px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red ${
                                filter === category
                                    ? 'text-flag-red'
                                    : 'text-text'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading && (
                    <p role="status">Loading tours...</p>
                )}

                {error && (
                    <p role="alert" className="text-flag-red">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {visibleTours.map((tour) => (
                            <TourCard key={tour.id} tour={tour} />
                        ))}
                    </div>
                )}
            </section>

            <Testimonials />
            <PlanYourTrip />
        </main>
    )
}

export default MainContent