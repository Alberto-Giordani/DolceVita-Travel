import { useParams } from 'react-router'

function TourDetails() {
    const { slug } = useParams()

    return (
        <main className="mx-auto max-w-290 px-4 py-14">
            <h1 className="mb-6 font-heading text-4xl">
                Your Italian escape
            </h1>

            <p className="mb-6">
                Selected tour: {slug}
            </p>

            <a
                href="/#tours"
                className="font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Back to all tours
            </a>
        </main>
    )
}

export default TourDetails