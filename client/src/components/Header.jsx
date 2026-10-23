import { useRef, useState } from 'react'
import HeaderAccount from './HeaderAccount'

const navigationLinks = [
    { href: '/#tours', label: 'Our tours' },
    { href: '/#testimonials', label: 'Traveller stories' },
    { href: '/#plan', label: 'Plan your trip' },
]

function HeaderLinks({ onNavigate }) {
    return (
        <ul className="flex flex-col gap-3 text-sm md:flex-row md:flex-wrap md:items-center md:justify-end md:gap-5">
            {navigationLinks.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        onClick={onNavigate}
                        className={`inline-block py-2 hover:text-flag-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red ${
                            link.href === '/#plan'
                                ? 'rounded-md border border-flag-green px-4 font-bold'
                                : ''
                        }`}
                    >
                        {link.label}
                    </a>
                </li>
            ))}

            <li className="min-w-0">
                <HeaderAccount onNavigate={onNavigate} />
            </li>
        </ul>
    )
}

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuButtonRef = useRef(null)

    function closeMenu() {
        setIsMenuOpen(false)
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu()
            menuButtonRef.current?.focus()
        }
    }

    return (
        <header onKeyDown={handleKeyDown}>
            <div className="relative mx-auto flex max-w-290 items-center justify-between gap-4 px-4 py-6">
                <a
                    href="/#home"
                    onClick={closeMenu}
                    className="inline-flex shrink-0 flex-col text-flag-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red"
                >
                    <span className="font-heading text-[2rem] leading-none">
                        DolceVita
                    </span>

                    <span className="mt-2 text-[0.6rem] font-bold tracking-[0.2em] text-flag-red">
                        TRAVEL
                    </span>
                </a>

                <nav
                    aria-label="Main navigation"
                    className="hidden min-w-0 md:block md:flex-1"
                >
                    <HeaderLinks />
                </nav>

                <button
                    ref={menuButtonRef}
                    type="button"
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-navigation"
                    onClick={() => setIsMenuOpen((previous) => !previous)}
                    className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-md border border-flag-green text-flag-green hover:text-flag-red focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-red md:hidden"
                >
                    <span className="sr-only">
                        {isMenuOpen ? 'Close navigation' : 'Open navigation'}
                    </span>

                    <span
                        aria-hidden="true"
                        className="relative block size-6"
                    >
                        <span
                            className={`absolute top-1/2 left-0 h-0.5 w-full bg-current transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isMenuOpen
                                    ? 'rotate-45'
                                    : '-translate-y-2'
                                }`}
                        />

                        <span
                            className={`absolute top-1/2 left-0 h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out motion-reduce:transition-none ${isMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}
                        />

                        <span
                            className={`absolute top-1/2 left-0 h-0.5 w-full bg-current transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isMenuOpen
                                    ? '-rotate-45'
                                    : 'translate-y-2'
                                }`}
                        />
                    </span>
                </button>

                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    inert={!isMenuOpen}
                    className={`absolute inset-x-4 top-full z-20 rounded-lg border border-border bg-flag-white p-5 shadow-md transition-[opacity,translate] duration-300 ease-in-out motion-reduce:transition-none md:hidden ${isMenuOpen
                            ? 'translate-y-0 opacity-100'
                            : 'pointer-events-none -translate-y-2 opacity-0'
                        }`}
                >
                    <HeaderLinks onNavigate={closeMenu} />
                </nav>
            </div>
        </header>
    )
}

export default Header