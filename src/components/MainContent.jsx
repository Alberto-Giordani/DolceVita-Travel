import { useState } from 'react'
import Hero from './Hero'
import TourCard from './TourCard'
import { tours } from '../data/tours'

const categories = ['All', 'Cities', 'Coast']

function MainContent() {
    const [filter, setFilter] = useState('All')

    const visibleTours =
        filter === 'All'
            ? tours
            : tours.filter((tour) => tour.category === filter)

    return (
        <main>
            <Hero />

            <section
                id="tours"
                className="mx-auto max-w-[1160px] px-4 py-14"
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
                            className={`cursor-pointer rounded-md border border-flag-green bg-flag-white px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red ${filter === category ? 'text-flag-red' : 'text-text'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {visibleTours.map((tour) => (
                        <TourCard key={tour.id} tour={tour} />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default MainContent