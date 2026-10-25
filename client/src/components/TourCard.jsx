import { Link } from 'react-router'
import TourBooking from './TourBooking'

function TourCard({ tour }) {
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
                    <Link
                        to={`/tours/${tour.slug}`}
                        className="hover:text-flag-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                    >
                        {tour.title}
                    </Link>
                </h3>

                <p className="mt-3 mb-4 text-sm text-muted">
                    {tour.description}
                </p>

                <p className="mt-auto mb-4 text-sm font-bold">
                    {tour.days} days · {tour.nights} nights
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                    <p>
                        <strong className="text-xl">
                            ${tour.price.toLocaleString('en-US')}
                        </strong>

                        <span className="text-xs text-muted">
                            {' '}/ person
                        </span>
                    </p>

                    <Link
                        to={`/tours/${tour.slug}`}
                        className="text-xs font-bold text-flag-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                    >
                        View tour
                    </Link>
                </div>

                <div className="mt-5">
                    <TourBooking tour={tour} />
                </div>
            </div>
        </article>
    )
}

export default TourCard