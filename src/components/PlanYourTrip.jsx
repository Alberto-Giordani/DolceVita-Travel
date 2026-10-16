function PlanYourTrip() {
  return (
    <section
      id="plan"
      className="mx-auto max-w-290 px-4 py-14"
    >
      <div className="flex flex-col items-start gap-5 rounded-xl bg-flag-green-dark px-6 py-8 text-flag-white md:p-8">
        <p className="text-xs font-bold tracking-[0.14em] uppercase">
          Make room for Italy
        </p>

        <h2 className="font-heading text-3xl leading-[1.15] lg:text-[2.5rem]">
          Your Italian story
          <br />
          starts here.
        </h2>

        <p className="max-w-xl">
          A city break, a coastal escape, or a little of both? Start
          with what you love and imagine the journey from there.
        </p>

        <a
          href="mailto:?subject=DolceVita%20Travel%20trip"
          className="inline-block max-w-full rounded-md bg-flag-white px-5 py-3.5 text-sm font-bold text-flag-green-dark hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flag-white"
        >
          Start planning by email
        </a>
      </div>
    </section>
  )
}

export default PlanYourTrip