import { FAQS } from "@/lib/faqs";
import { CONTACT } from "@/lib/site";

export default function Faq() {
  return (
    <section className="bg-sage-soft/60 py-20 sm:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <p className="eyebrow">Pricing FAQ</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Good to know</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">
            Can&apos;t find what you need? Reach out and we&apos;ll be happy to help.
          </p>
          <a href={`mailto:${CONTACT.email}`} className="btn-outline mt-8">
            Contact Us
          </a>
        </div>
        <div className="divide-y divide-border rounded-3xl bg-surface px-6 sm:px-8">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center gap-4 font-serif text-lg text-foreground marker:hidden group-open:text-accent sm:text-xl [&::-webkit-details-marker]:hidden">
                <span className="w-4 flex-none text-center text-accent">
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">–</span>
                </span>
                {f.q}
              </summary>
              <p className="pl-8 pt-3 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
