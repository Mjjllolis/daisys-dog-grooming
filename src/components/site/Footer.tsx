import Logo from "./Logo";
import { NAV } from "@/lib/nav";
import { CONTACT, HOURS, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#2f392c] text-white/80">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Calm, gentle, one-on-one grooming for the pups you love.
          </p>
        </div>
        <div>
          <h4 className="text-lg text-white">Visit</h4>
          <p className="mt-4 text-sm leading-relaxed">
            {CONTACT.street}
            <br />
            {CONTACT.city}
          </p>
          <p className="mt-3 text-sm">
            <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`} className="hover:text-white">{CONTACT.phone}</a>
            <br />
            <a href={`mailto:${CONTACT.email}`} className="hover:text-white">{CONTACT.email}</a>
          </p>
        </div>
        <div>
          <h4 className="text-lg text-white">Hours</h4>
          <ul className="mt-4 space-y-1.5 text-sm">
            {HOURS.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 sm:max-w-[220px]">
                <span>{h.days}</span>
                <span className="text-white/60">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg text-white">Explore</h4>
          <ul className="mt-4 grid grid-cols-2 gap-y-1.5 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-white">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="container-x py-6 text-xs text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
