import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import TourBooking from './TourBooking'

function TourDetails() {
    const { slug } = useParams()
    const [result, setResult] = useState(null)

    useEffect(() => {
        let ignore = false

        window.scrollTo(0, 0)

        async function loadTour() {
            try {
                const response = await fetch(
                    `/api/tours/${encodeURIComponent(slug)}`
                )

                if (response.status === 404) {
                    if (!ignore) {
                        setResult({
                            slug,
                            tour: null,
                            error: 'Tour not found. Please choose another tour.',
                        })
                    }

                    return
                }

                if (!response.ok) {
                    throw new Error('Failed to load tour')
                }

                const tour = await response.json()

                if (!ignore) {
                    setResult({
                        slug,
                        tour,
                        error: '',
                    })
                }
            } catch {
                if (!ignore) {
                    setResult({
                        slug,
                        tour: null,
                        error: 'Unable to load this tour. Please try again later.',
                    })
                }
            }
        }

        loadTour()

        return () => {
            ignore = true
        }
    }, [slug])

    const isLoading = result?.slug !== slug
    const tour = isLoading ? null : result.tour
    const error = isLoading ? '' : result.error

    return (
        <main className="mx-auto max-w-290 px-4 py-14">
            <a
                href="/#tours"
                className="mb-8 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Back to all tours
            </a>

            <h1 className="mb-8 font-heading text-4xl md:text-5xl">
                {tour ? tour.title : 'Your Italian escape'}
            </h1>

            {isLoading && (
                <p role="status" className="text-muted">
                    Loading your tour…
                </p>
            )}

            {error && (
                <p role="alert" className="text-flag-red">
                    {error}
                </p>
            )}

            {tour && (
                <article className="grid items-start gap-8 md:grid-cols-2">
                    <img
                        src={`/${tour.image}`}
                        alt={tour.alt}
                        className="aspect-3/2 w-full rounded-lg object-cover"
                    />

                    <div className="min-w-0">
                        <p className="mb-4 text-sm font-bold tracking-widest text-flag-red uppercase">
                            {tour.category}
                        </p>

                        <p className="mb-6 text-muted">
                            {tour.description}
                        </p>

                        <p className="mb-6 font-bold">
                            {tour.days} days · {tour.nights} nights
                        </p>

                        <p className="mb-8">
                            <span className="text-sm text-muted">
                                From{' '}
                            </span>

                            <strong className="text-3xl">
                                ${tour.price.toLocaleString('en-US')}
                            </strong>

                            <span className="text-sm text-muted">
                                {' '}/ person
                            </span>
                        </p>

                        <div className="mt-8">
                            <TourBooking key={tour.id} tour={tour} />

                            <a
                                href="/#plan"
                                className="mt-6 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                            >
                                Plan your trip
                            </a>
                        </div>
                    </div>
                </article>
            )}
        </main>
    )
}

export default TourDetails