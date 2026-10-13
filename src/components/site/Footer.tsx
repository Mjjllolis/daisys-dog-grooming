import Logo from "./Logo";
import { Daisy } from "./Shapes";
import { NAV } from "@/lib/nav";
import { BOOKING_HREF, CONTACT, FACEBOOK_HREF, HOURS, MAPS_EMBED, MAPS_HREF, PORTAL_HREF, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#2f392c] text-white/80">
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Logo light className="h-16 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
              Calm, one-on-one dog grooming in Addis, Louisiana.
            </p>
          </div>
          <div>
            <h4 className="text-lg text-white">Visit</h4>
            <a href={MAPS_HREF} target="_blank" rel="noopener" className="mt-4 block text-sm leading-relaxed hover:text-white">
              {CONTACT.street}
              <br />
              {CONTACT.city}
            </a>
            <p className="mt-3 text-sm">
              <a href={`tel:${CONTACT.phone.replace(/\D/g, "")}`} className="hover:text-white">{CONTACT.phone}</a>
              <br />
              <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-white">{CONTACT.email}</a>
            </p>
          </div>
          <div>
            <h4 className="text-lg text-white">Hours</h4>
            <ul className="mt-4 space-y-1.5 text-sm">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-white/60">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sm:col-span-2">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="hover:text-white">{n.label}</a>
                </li>
              ))}
              <li><a href={BOOKING_HREF} target="_blank" rel="noopener" className="hover:text-white">Book Online</a></li>
              <li><a href={PORTAL_HREF} target="_blank" rel="noopener" className="hover:text-white">Client Login</a></li>
              <li><a href={FACEBOOK_HREF} target="_blank" rel="noopener" className="hover:text-white">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <Daisy className="absolute -right-3 -top-5 z-10 h-12 w-12" />
          <iframe
            title={`Map to ${SITE_NAME}`}
            src={MAPS_EMBED}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full rounded-[3rem_1rem_3rem_1rem] border-0 grayscale-[30%] lg:h-full lg:min-h-[320px]"
          />
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
