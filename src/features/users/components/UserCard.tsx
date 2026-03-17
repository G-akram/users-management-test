import { Mail, Phone, MapPin } from "lucide-react";
import type { User } from "../types/user.types";

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const { name, email, picture, location, phone, dob, nat } = user;
  const fullName = `${name.first} ${name.last}`;
  const city = `${location.city}, ${location.country}`;

  // TODO: wrap in <Link to={detailUrl}> once a user detail page is added.

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      {/* ── Photo ─────────────────────────────────────────────────────── */}
      <div className="relative h-48 overflow-hidden bg-slate-100 shrink-0">
        <img
          src={picture.large}
          alt={fullName}
          className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Nationality pill */}
        <span className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm text-white text-[10px] font-mono font-semibold tracking-widest px-2.5 py-1 rounded-full border border-white/20">
          {nat}
        </span>

        {/* Age badge */}
        <span className="absolute top-3 left-3 bg-white/15 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
          {dob.age} yrs
        </span>

        {/* Name overlaid */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3.5">
          <h2 className="text-white font-bold text-base leading-tight drop-shadow-sm">
            {fullName}
          </h2>
        </div>
      </div>

      {/* ── Details ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-2.5 px-4 py-4 flex-1">
        <DetailRow icon={<Mail className="w-3.5 h-3.5" />} label={email} truncate />
        <DetailRow icon={<Phone className="w-3.5 h-3.5" />} label={phone} />
        <DetailRow icon={<MapPin className="w-3.5 h-3.5" />} label={city} truncate />
      </div>
    </article>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  truncate?: boolean;
}

function DetailRow({ icon, label, truncate }: DetailRowProps) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <span className="shrink-0 text-brand-400">{icon}</span>
      <span
        className={`text-slate-500 text-xs leading-snug ${truncate ? "truncate" : ""}`}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}
