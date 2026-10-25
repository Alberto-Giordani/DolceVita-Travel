import { useState } from 'react'
import { Link } from 'react-router'
import TravellerStepper from './TravellerStepper'

function TourBooking({ tour }) {
    const [travellers, setTravellers] = useState(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [needsLogin, setNeedsLogin] = useState(false)

    const displayedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(tour.price * travellers)

    async function handleCheckout() {
        if (isSubmitting) return

        setIsSubmitting(true)
        setError('')
        setNeedsLogin(false)

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tourId: tour.id,
                    quantity: travellers,
                }),
            })

            const data = await response.json().catch(() => null)

            if (response.status === 401) {
                setNeedsLogin(true)
            }

            if (!response.ok) {
                throw new Error(
                    data?.error ||
                    'Unable to start checkout. Please try again.'
                )
            }

            if (typeof data?.url !== 'string' || !data.url) {
                throw new Error('The checkout URL is missing.')
            }

            window.location.assign(data.url)
        } catch (error) {
            setError(
                error.message ||
                'Unable to connect. Please try again.'
            )
            setIsSubmitting(false)
        }
    }

    return (
        <div>
            <fieldset
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className="min-w-0 border-0 p-0"
            >
                <legend className="mb-3 text-sm font-bold">
                    Travellers
                </legend>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    <TravellerStepper
                        value={travellers}
                        onChange={setTravellers}
                    />

                    <p>
                        <span className="text-sm text-muted">
                            Total:{' '}
                        </span>

                        <strong className="text-xl">
                            {displayedTotal}
                        </strong>
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleCheckout}
                    className="mt-4 w-full cursor-pointer rounded-md bg-flag-red px-5 py-3 font-bold text-flag-white transition-colors hover:bg-flag-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red disabled:cursor-wait disabled:opacity-60"
                >
                    {isSubmitting ? 'Opening checkout…' : 'Book now'}
                </button>
            </fieldset>

            {error && (
                <p role="alert" className="mt-3 text-sm text-flag-red">
                    {error}
                </p>
            )}

            {needsLogin && (
                <Link
                    to="/login"
                    className="mt-3 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                >
                    Sign in to book
                </Link>
            )}

            <p className="mt-3 text-xs text-muted">
                Test checkout: no real money is charged and no travel
                reservation is made.
            </p>
        </div>
    )
}

export default TourBooking