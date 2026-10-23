import { useState } from 'react'
import { Link } from 'react-router'
import { authClient } from '../lib/auth-client'

function HeaderAccount({ onNavigate }) {
    const {
        data: session,
        isPending,
        error: sessionError,
    } = authClient.useSession()

    const [isSigningOut, setIsSigningOut] = useState(false)
    const [error, setError] = useState('')

    async function handleSignOut() {
        setError('')
        setIsSigningOut(true)

        try {
            const result = await authClient.signOut()

            if (result.error) {
                setError('Unable to sign out. Please try again.')
                return
            }

            onNavigate?.()
        } catch {
            setError('Unable to connect. Please try again.')
        } finally {
            setIsSigningOut(false)
        }
    }

    if (isPending) {
        return (
            <span role="status" className="text-muted">
                Checking account…
            </span>
        )
    }

    if (sessionError) {
        return (
            <p role="alert" className="text-flag-red">
                Unable to check your account. Please refresh.
            </p>
        )
    }

    if (!session) {
        return (
            <Link
                to="/login"
                onClick={onNavigate}
                className="inline-block py-2 font-bold text-flag-red hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
            >
                Sign in
            </Link>
        )
    }

    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <span
                    title={session.user.name}
                    className="max-w-40 truncate"
                >
                    Hello, {session.user.name}
                </span>

                <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="cursor-pointer rounded-md border border-flag-green px-4 py-2 font-bold text-flag-red hover:bg-flag-green hover:text-flag-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red disabled:cursor-wait disabled:opacity-60"
                >
                    {isSigningOut ? 'Signing out…' : 'Sign out'}
                </button>
            </div>

            {error && (
                <p role="alert" className="mt-2 text-flag-red">
                    {error}
                </p>
            )}
        </div>
    )
}

export default HeaderAccount