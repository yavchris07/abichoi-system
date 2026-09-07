
/* =========================================================
   KPI
========================================================= */

import { TrendingDown, TrendingUp } from "lucide-react";

type FinanceKpiProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: string;
  positive?: boolean;
  accent?: boolean;
};

export const FinanceKpi = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  positive,
  accent,
}: FinanceKpiProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            accent ? "bg-amber-50 text-amber-600" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          {icon}
        </div>

        <span
          className={`flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}

          {trend}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold tracking-tight text-zinc-950">
          {value}
        </p>

        <p className="mt-1 text-[11px] text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
};