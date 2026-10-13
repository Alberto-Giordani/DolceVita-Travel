import {testimonials} from '../data/testimonials'

function Testimonials() {
  return (
    <section id="testimonials" className="bg-soft py-14">
      <div className="mx-auto max-w-[1160px] px-4">
        <p className="mb-3 text-xs font-bold tracking-[0.14em] text-flag-red uppercase">
          Traveller stories · sample reviews
        </p>

        <h2 className="mb-8 font-heading text-3xl leading-[1.15] lg:text-[2.5rem]">
          Memories worth bringing home.
        </h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="flex min-w-0 flex-col gap-6 rounded-lg bg-flag-white p-6 transition-[translate,box-shadow] duration-500 ease-in hover:-translate-x-[5px] hover:-translate-y-[5px] hover:shadow-card"
            >
              <blockquote className="text-[1.05rem]">
                <p>“{testimonial.quote}”</p>
              </blockquote>

              <figcaption className="mt-auto text-sm">
                <strong className="block">
                  {testimonial.name}
                </strong>
                <span className="block text-muted">
                  {testimonial.trip}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials