import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

function CheckoutSuccess() {
    const [searchParams] = useSearchParams()
    const orderId = searchParams.get('order_id')
    const [result, setResult] = useState(null)

    useEffect(() => {
        if (!orderId) return

        let ignore = false
        let timer
        let attempts = 0

        const controller = new AbortController()

        window.scrollTo(0, 0)

        async function loadOrder() {
            attempts += 1

            try {
                const response = await fetch(
                    `/api/orders/${encodeURIComponent(orderId)}`,
                    {
                        signal: controller.signal,
                        cache: 'no-store',
                    }
                )

                if (ignore) return

                if (!response.ok) {
                    let message =
                        'Unable to load your order. Please try again.'

                    if (response.status === 401) {
                        message =
                            'Please sign in, then return to this page to view your order.'
                    } else if (response.status === 404) {
                        message = 'Order not found for your account.'
                    }

                    setResult({
                        orderId,
                        error: message,
                        needsLogin: response.status === 401,
                    })

                    return
                }

                const order = await response.json()

                if (ignore) return

                const checking =
                    order.status === 'pending' && attempts < 10

                setResult({
                    orderId,
                    order,
                    checking,
                    error: '',
                })

                if (checking) {
                    timer = window.setTimeout(loadOrder, 2000)
                }
            } catch {
                if (ignore) return

                setResult({
                    orderId,
                    error:
                        'Unable to connect to the server. Please try again.',
                })
            }
        }

        loadOrder()

        return () => {
            ignore = true
            controller.abort()
            window.clearTimeout(timer)
        }
    }, [orderId])

    const current = result?.orderId === orderId ? result : null
    const isLoading = Boolean(orderId) && !current
    const order = current?.order
    const isPaid = order?.status === 'paid'

    const error = !orderId
        ? 'The order ID is missing from this page’s address.'
        : current?.error

    function formatMoney(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: order.currency,
        }).format(amount / 100)
    }

    return (
        <main className="mx-auto max-w-290 px-4 py-14">
            <h1 className="mb-6 font-heading text-4xl md:text-5xl">
                {isPaid ? 'Payment confirmed' : 'Your order'}
            </h1>

            {isLoading && (
                <p role="status" className="text-muted">
                    Checking your order…
                </p>
            )}

            {error && (
                <div role="alert">
                    <p className="text-flag-red">{error}</p>

                    {current?.needsLogin && (
                        <Link
                            to="/login"
                            className="mt-4 inline-block font-bold text-flag-red underline"
                        >
                            Sign in
                        </Link>
                    )}
                </div>
            )}

            {order && (
                <section
                    aria-label="Order confirmation"
                    className="rounded-lg border border-border bg-white p-6"
                >
                    <div role="status" className="mb-6">
                        {isPaid ? (
                            <p className="font-bold text-flag-green">
                                Thank you! Your test payment is confirmed.
                            </p>
                        ) : order.status === 'pending' ? (
                            <p className="text-muted">
                                {current.checking
                                    ? 'Waiting for payment confirmation. This page will check again automatically…'
                                    : 'Confirmation is still pending. Check again shortly; you do not need to make another payment.'}
                            </p>
                        ) : (
                            <p>Order status: {order.status}</p>
                        )}
                    </div>

                    <p className="mb-6 break-all text-sm text-muted">
                        Order reference: {order.id}
                    </p>

                    <ul className="divide-y divide-border">
                        {order.items.map((item) => (
                            <li key={item.id} className="py-4">
                                <h2 className="text-xl font-bold">
                                    {item.tourTitle}
                                </h2>

                                <p className="mt-2 text-muted">
                                    {item.quantity} traveller
                                    {item.quantity === 1 ? '' : 's'}
                                    {' · '}
                                    {formatMoney(item.unitPrice)} per person
                                </p>

                                <p className="mt-2 font-bold">
                                    {formatMoney(
                                        item.unitPrice * item.quantity
                                    )}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-6 text-2xl font-bold">
                        Total: {formatMoney(order.totalAmount)}
                    </p>

                    {!isPaid && !current.checking && (
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-6 rounded-md bg-flag-red px-5 py-3 font-bold text-flag-white transition-colors hover:bg-flag-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                        >
                            Check again
                        </button>
                    )}

                    <p className="mt-6 text-sm text-muted">
                        Test mode: no real money is charged and no travel
                        reservation is made.
                    </p>
                </section>
            )}

            <a
                href="/#tours"
                className="mt-8 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Back to all tours
            </a>
        </main>
    )
}

export default CheckoutSuccess