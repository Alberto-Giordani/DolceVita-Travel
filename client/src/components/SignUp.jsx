import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { authClient } from '../lib/auth-client'

function SignUp() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const result = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
            })

            if (result.error) {
                setError(
                    result.error.message || 'Unable to create your account.'
                )
                return
            }

            navigate('/')
        } catch {
            setError('Unable to connect. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="mx-auto max-w-md px-4 py-14">
            <h1 className="mb-4 font-heading text-4xl">
                Join DolceVita Travel
            </h1>

            <p className="mb-8 text-muted">
                Create your account and start dreaming of Italy.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-lg border border-border p-6"
            >
                <div>
                    <label
                        htmlFor="signup-name"
                        className="mb-2 block text-sm font-bold"
                    >
                        Name
                    </label>

                    <input
                        id="signup-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-md border border-border bg-flag-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-green"
                    />
                </div>

                <div>
                    <label
                        htmlFor="signup-email"
                        className="mb-2 block text-sm font-bold"
                    >
                        Email
                    </label>

                    <input
                        id="signup-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-md border border-border bg-flag-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-green"
                    />
                </div>

                <div>
                    <label
                        htmlFor="signup-password"
                        className="mb-2 block text-sm font-bold"
                    >
                        Password
                    </label>

                    <input
                        id="signup-password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        maxLength={128}
                        aria-describedby="password-help"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-md border border-border bg-flag-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-green"
                    />

                    <p
                        id="password-help"
                        className="mt-2 text-sm text-muted"
                    >
                        Use between 8 and 128 characters.
                    </p>
                </div>

                {error && (
                    <p role="alert" className="text-sm text-flag-red">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer rounded-md bg-flag-red px-5 py-3 font-bold text-flag-white hover:bg-flag-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red disabled:cursor-wait disabled:opacity-60"
                >
                    {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
            </form>

            <p className="mt-6 text-sm">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                >
                    Sign in
                </Link>
            </p>

            <Link
                to="/"
                className="mt-6 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Back to the homepage
            </Link>
        </main>
    )
}

export default SignUp