import type { CSSProperties } from "react";
import type { User } from "../types/user.types";

interface UserCardProps {
  user: User;
  page: number;
  pageSize: number;
  style?: CSSProperties;
}

export function UserCard({ user }: UserCardProps) {
  const { name, email, picture, location, phone, dob, nat } = user;
  const fullName = `${name.first} ${name.last}`;
  const city = `${location.city}, ${location.country}`;

  // TODO: implement when user detail page is added
  // const detailUrl = `/users/${login.uuid}?page=${page}&pageSize=${pageSize}`;

  return (
    /* TODO: can be converted to a <Link> once a user detail page exists */
    <div>
      {/* ── Photo ───────────────────────────────────────────────────────── */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={picture.large}
          alt={fullName}
          className="w-full h-full object-cover object-top scale-105 group-hover:scale-100 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

        {/* Nationality pill */}
        <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-mono font-medium tracking-widest px-2 py-0.5 rounded-full border border-white/30">
          {nat}
        </span>

        {/* Name + age overlaid on photo */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
          <h2 className="text-white font-semibold text-base leading-tight drop-shadow">
            {fullName}
          </h2>
          <p className="text-white/70 text-xs font-mono mt-0.5">{dob.age} yrs</p>
        </div>
      </div>

      {/* ── Details ─────────────────────────────────────────────────────── */}
      <div className="px-4 py-3 flex flex-col gap-2 flex-1">
        {/* TODO: add icons per row */}
        <DetailRow icon={null} label={email} truncate />
        <DetailRow icon={null} label={phone} />
        <DetailRow icon={null} label={city} truncate />
      </div>
    </div>
  );
}

interface DetailRowProps {
  icon: React.ReactNode;
  label: string;
  truncate?: boolean;
}

function DetailRow({ icon, label, truncate }: DetailRowProps) {
  return (
    <div className="flex items-center gap-2 min-w-0 text-brand-500">
      <span className="shrink-0">{icon}</span>
      <span
        className={`text-slate-500 text-xs leading-tight ${truncate ? "truncate" : ""}`}
        title={label}
      >
        {label}
      </span>
    </div>
  );
}
