import Image from "next/image";
import { POSTS } from "@/lib/blog";

export default function Blog() {
  return (
    <section id="blog" className="container-x py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">From the Blog</p>
          <h2 className="mt-4 text-4xl sm:text-5xl">Grooming tips &amp; pet care</h2>
        </div>
        <a href="#blog" className="btn-outline">View All Posts</a>
      </div>
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {POSTS.map((p) => (
          <article key={p.title} className="group overflow-hidden rounded-3xl border border-border bg-surface">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={p.image} alt="" fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest">
                <span className="text-accent">{p.category}</span>
                <span className="text-muted"> · {p.date}</span>
              </p>
              <h3 className="mt-3 text-xl leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              <a href="#blog" className="mt-5 inline-block text-sm font-semibold text-accent">
                Read more →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
