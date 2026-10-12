function Header() {
    return (
        <header>
            <div className="mx-auto flex max-w-[1160px] flex-col items-center gap-5 px-4 py-6 md:flex-row md:flex-wrap md:justify-between">
                <a href="#home" className="inline-flex flex-col text-flag-green">
                    <span className="font-heading text-[2rem] leading-none">
                        DolceVita
                    </span>
                    <span className="mt-2 text-[0.6rem] font-bold tracking-[0.2em] text-flag-red">
                        TRAVEL
                    </span>
                </a>

                <nav>
                    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
                        <li>
                            <a
                                href="#tours"
                                className="inline-block py-2 hover:text-flag-red"
                            >
                                Our tours
                            </a>
                        </li>
                        <li>
                            <a
                                href="#testimonials"
                                className="inline-block py-2 hover:text-flag-red"
                            >
                                Traveller stories
                            </a>
                        </li>
                        <li>
                            <a
                                href="#plan"
                                className="inline-block rounded-md border border-flag-green px-4 py-2 font-bold hover:text-flag-red"
                            >
                                Plan your trip
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header