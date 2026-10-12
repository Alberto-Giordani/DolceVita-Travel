import tuscanyHero from '../../images/tuscany-hero.jpg'

function Hero() {
  return (
    <section id="home" className="mx-auto max-w-[1160px] px-4">
      <div
        className="relative overflow-hidden rounded-xl bg-flag-green-dark bg-cover bg-center"
        style={{ backgroundImage: `url(${tuscanyHero})` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-overlay"
        />

        <div className="relative flex min-h-[460px] flex-col items-start gap-6 px-6 py-11 text-flag-white md:min-h-[500px] md:p-14">
          <p className="text-xs font-bold tracking-[0.14em] uppercase">
            Buongiorno, Italy
          </p>

          <h1 className="font-heading text-5xl leading-[1.15] md:text-[4rem] lg:text-[4.75rem]">
            Life is sweeter
            <br />
            in Italy.
          </h1>

          <p className="max-w-lg">
            Timeless cities. Sunlit coastlines. Long lunches. Find your
            own little piece of dolce vita.
          </p>

          <a
            href="#plan"
            className="inline-block max-w-full rounded-md bg-flag-red px-5 py-3.5 text-sm font-bold hover:bg-flag-red-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-white"
          >
            Plan your trip
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero