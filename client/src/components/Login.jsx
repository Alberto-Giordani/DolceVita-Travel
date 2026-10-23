import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { authClient } from '../lib/auth-client'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            const result = await authClient.signIn.email({
                email: email.trim(),
                password,
            })

            if (result.error) {
                setError(
                    result.error.message || 'Unable to sign in.'
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
                Welcome back
            </h1>

            <p className="mb-8 text-muted">
                Sign in to your DolceVita Travel account.
            </p>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-lg border border-border p-6"
            >
                <div>
                    <label
                        htmlFor="login-email"
                        className="mb-2 block text-sm font-bold"
                    >
                        Email
                    </label>

                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="username"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-md border border-border bg-flag-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-green"
                    />
                </div>

                <div>
                    <label
                        htmlFor="login-password"
                        className="mb-2 block text-sm font-bold"
                    >
                        Password
                    </label>

                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        minLength={8}
                        maxLength={128}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-md border border-border bg-flag-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-green"
                    />
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
                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <p className="mt-6 text-sm">
                No account yet?{' '}
                <Link
                    to="/signup"
                    className="font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                >
                    Create an account
                </Link>
            </p>

            <Link
                to="/"
                className="mt-4 inline-block font-bold text-flag-red underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Back to the homepage
            </Link>
        </main>
    )
}

export default Login