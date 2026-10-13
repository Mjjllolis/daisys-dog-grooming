import Wave from "./Wave";
import { BOOKING_HREF } from "@/lib/site";

export default function Offer() {
  return (
    <section id="book" className="relative bg-background">
      <Wave fill="rgb(var(--forest))" />
      <div className="bg-forest pb-24 pt-10 text-center text-white sm:pt-14">
        <div className="container-x max-w-2xl">
          <p className="eyebrow !text-[#f2c9a0] justify-center">New Client Offer</p>
          <h2 className="mt-5 text-4xl leading-tight sm:text-6xl">Treat your pup: 20% off the first groom</h2>
          <p className="mx-auto mt-6 max-w-md text-white/75">
            Book your first visit this month and enjoy a pampering spa day at a special price.
          </p>
          <a href={BOOKING_HREF} className="btn-primary mt-10">
            Claim My 20% Off
          </a>
        </div>
      </div>
    </section>
  );
}
