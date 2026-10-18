function TravellerStepper({ value, onChange, min = 1, max = 8 }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-flag-green p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease number of travellers"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg font-bold text-flag-green hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-red disabled:cursor-not-allowed disabled:opacity-40"
      >
        −
      </button>

      <span
        aria-live="polite"
        className="w-6 text-center text-sm font-bold"
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase number of travellers"
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-lg font-bold text-flag-green hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-red disabled:cursor-not-allowed disabled:opacity-40"
      >
        +
      </button>
    </div>
  )
}

export default TravellerStepper