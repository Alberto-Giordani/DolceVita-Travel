function Footer() {
  return (
    <footer className="border-t border-border pt-10 pb-6">
      <div className="mx-auto max-w-290 px-4">
        <div className="flex flex-col items-start gap-6 md:flex-row md:flex-wrap md:items-center md:justify-between">
          <div>
            <a
              href="/#home"
              className="inline-flex flex-col text-flag-green"
            >
              <span className="font-heading text-[2rem] leading-none">
                DolceVita
              </span>
              <span className="mt-2 text-[0.6rem] font-bold tracking-[0.2em] text-flag-red">
                TRAVEL
              </span>
            </a>

            <p className="mt-3 text-sm text-muted">
              A lot of Italy
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <li>
                <a
                  href="/#plan"
                  className="inline-block py-2 hover:text-flag-red"
                >
                  Plan your trip
                </a>
              </li>
              <li>
                <a
                  href="/#home"
                  className="inline-block py-2 hover:text-flag-red"
                >
                  Back to top ↑
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-sm text-muted md:flex-row md:flex-wrap md:items-center md:justify-between">
          <p>
            &copy; Alberto Giordani. Offers, prices, and testimonials
            are fictional.
          </p>

          <a
            href="https://unsplash.com"
            className="underline hover:text-flag-red"
          >
            Photography via Unsplash
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer