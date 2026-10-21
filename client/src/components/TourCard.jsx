import { useState } from 'react'
import TravellerStepper from './TravellerStepper'

function TourCard({ tour }) {
    const [travellers, setTravellers] = useState(1)

    return (
        <article className="flex min-w-0 flex-col overflow-hidden rounded-[10px] border border-border bg-flag-white transition-[translate,box-shadow] duration-500 ease-in hover:-translate-x-[5px] hover:-translate-y-[5px] hover:shadow-card">
            <img
                src={`/${tour.image}`}
                alt={tour.alt}
                loading="lazy"
                className="aspect-3/2 w-full object-cover"
            />

            <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.45rem] font-bold">
                    {tour.title}
                </h3>

                <p className="mt-3 mb-4 text-sm text-muted">
                    {tour.description}
                </p>

                <p className="mt-auto mb-4 text-sm font-bold">
                    {tour.days} days · {tour.nights} nights
                </p>

                <div
                    role="group"
                    aria-label={`Travellers for ${tour.title}`}
                    className="mb-4 flex flex-wrap items-center justify-between gap-3"
                >
                    <span className="text-sm font-bold">Travellers</span>

                    <TravellerStepper
                        value={travellers}
                        onChange={setTravellers}
                    />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                    <p>
                        <span className="text-xs text-muted">From </span>
                        <strong className="text-xl">
                            ${tour.price.toLocaleString('en-US')}
                        </strong>
                        <span className="text-xs text-muted"> / person</span>
                    </p>

                    <a
                        href="#plan"
                        className="text-xs font-bold text-flag-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                    >
                        Plan trip
                    </a>
                </div>
            </div>
        </article>
    )
}

export default TourCard