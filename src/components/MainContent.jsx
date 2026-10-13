import Hero from './Hero'
import TourCard from './TourCard'
import { tours } from '../data/tours'

function MainContent() {
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </main>
  )
}

export default MainContent