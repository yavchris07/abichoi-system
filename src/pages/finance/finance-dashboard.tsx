import {
  ArrowDownLeft,
  ArrowUpRight,
//   Banknote,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  ReceiptText,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

const FinanceDashboard = () => {
  return (
    <div className="min-h-full bg-zinc-50 p-4 md:p-6">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Wallet size={19} />
            </div>

            <div>
              <h1 className="text-lg font-bold text-zinc-950">
                Finance
              </h1>

              <p className="mt-0.5 text-xs text-zinc-400">
                Vue d'ensemble de la trésorerie.
              </p>
            </div>
          </div>
        </div>

        {/* Period */}
        <button
          type="button"
          className="flex items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 sm:self-auto"
        >
          <CalendarDays
            size={15}
            className="text-zinc-400"
          />

          Aujourd'hui

          <ChevronRight
            size={14}
            className="text-zinc-400"
          />
        </button>
      </div>

      {/* =====================================================
          KPI
      ====================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <FinanceKpi
          title="Solde total"
          value="$ 24,850.00"
          subtitle="Trésorerie disponible"
          icon={<Wallet size={18} />}
          trend="+4.2%"
          positive
          accent
        />

        <FinanceKpi
          title="Entrées"
          value="$ 8,450.00"
          subtitle="32 opérations"
          icon={<ArrowDownLeft size={18} />}
          trend="+12.5%"
          positive
        />

        <FinanceKpi
          title="Sorties"
          value="$ 3,280.00"
          subtitle="18 opérations"
          icon={<ArrowUpRight size={18} />}
          trend="-3.8%"
          positive
        />

        <FinanceKpi
          title="Solde net"
          value="+$ 5,170.00"
          subtitle="Sur la période"
          icon={<CircleDollarSign size={18} />}
          trend="+8.1%"
          positive
        />
      </div>

      {/* =====================================================
          MAIN GRID
      ====================================================== */}
      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]">
        {/* Cash flow */}
        <CashFlowCard />

        {/* Expense distribution */}
        <ExpenseDistribution />
      </div>

      {/* =====================================================
          QUICK ACTIONS
      ====================================================== */}
      <div className="mt-5">
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-zinc-900">
            Actions rapides
          </h2>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            Accéder rapidement aux opérations financières.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <QuickAction
            icon={<ArrowDownLeft size={17} />}
            title="Nouveau dépôt"
            description="Enregistrer une entrée"
          />

          <QuickAction
            icon={<ArrowUpRight size={17} />}
            title="Nouveau retrait"
            description="Enregistrer une sortie"
          />

          <QuickAction
            icon={<ReceiptText size={17} />}
            title="Nouvelle dépense"
            description="Enregistrer une dépense"
          />
        </div>
      </div>

      {/* =====================================================
          RECENT OPERATIONS
      ====================================================== */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
          <div>
            <h2 className="text-sm font-semibold text-zinc-950">
              Dernières opérations
            </h2>

            <p className="mt-0.5 text-[11px] text-zinc-400">
              Les dernières opérations financières enregistrées.
            </p>
          </div>

          <button
            type="button"
            className="text-[11px] font-semibold text-amber-600 transition hover:text-amber-700"
          >
            Voir tout
          </button>
        </div>

        <RecentOperations />
      </div>
    </div>
  );
};

/* =========================================================
   KPI
========================================================= */

type FinanceKpiProps = {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend: string;
  positive?: boolean;
  accent?: boolean;
};

const FinanceKpi = ({
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
            accent
              ? "bg-amber-50 text-amber-600"
              : "bg-zinc-100 text-zinc-500"
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
          {positive ? (
            <TrendingUp size={11} />
          ) : (
            <TrendingDown size={11} />
          )}

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

        <p className="mt-1 text-[11px] text-zinc-400">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

/* =========================================================
   CASH FLOW
========================================================= */

const CashFlowCard = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            Flux de trésorerie
          </h2>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            Évolution des entrées et sorties.
          </p>
        </div>

        <select className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[10px] text-zinc-600 outline-none focus:border-amber-500">
          <option>7 jours</option>
          <option>30 jours</option>
          <option>3 mois</option>
        </select>
      </div>

      {/* Chart placeholder */}
      <div className="mt-6 h-60">
        <div className="relative h-full">
          {/* Grid */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="border-t border-dashed border-zinc-100"
              />
            ))}
          </div>

          {/* Fake chart */}
          <div className="absolute inset-x-0 bottom-5 top-5 flex items-end justify-around px-3">
            {[
              { in: 48, out: 25 },
              { in: 65, out: 32 },
              { in: 42, out: 28 },
              { in: 80, out: 35 },
              { in: 60, out: 42 },
              { in: 90, out: 38 },
              { in: 72, out: 30 },
            ].map((item, index) => (
              <div
                key={index}
                className="flex h-full items-end gap-1"
              >
                <div
                  className="w-3 rounded-t-md bg-amber-400/80 transition hover:bg-amber-500"
                  style={{
                    height: `${item.in}%`,
                  }}
                />

                <div
                  className="w-3 rounded-t-md bg-zinc-200 transition hover:bg-zinc-300"
                  style={{
                    height: `${item.out}%`,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Labels */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around text-[9px] text-zinc-400">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-5 border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-amber-400" />

          <span className="text-[10px] text-zinc-500">
            Entrées
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-zinc-300" />

          <span className="text-[10px] text-zinc-500">
            Sorties
          </span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   EXPENSE DISTRIBUTION
========================================================= */

const ExpenseDistribution = () => {
  const expenses = [
    {
      name: "Salaires",
      value: "$ 1,380",
      percent: 42,
    },
    {
      name: "Fournitures",
      value: "$ 820",
      percent: 25,
    },
    {
      name: "Transport",
      value: "$ 590",
      percent: 18,
    },
    {
      name: "Autres",
      value: "$ 490",
      percent: 15,
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold text-zinc-950">
          Répartition des dépenses
        </h2>

        <p className="mt-0.5 text-[11px] text-zinc-400">
          Où sont concentrées les sorties.
        </p>
      </div>

      <div className="my-7 flex items-center justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[18px] border-amber-400">
          <div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-r-zinc-200 border-b-zinc-300 rotate-[-20deg]" />

          <div className="text-center">
            <p className="text-lg font-bold text-zinc-950">
              $3,280
            </p>

            <p className="text-[10px] text-zinc-400">
              Total
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {expenses.map((expense, index) => (
          <div
            key={expense.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full ${
                  index === 0
                    ? "bg-amber-400"
                    : index === 1
                      ? "bg-zinc-400"
                      : index === 2
                        ? "bg-zinc-300"
                        : "bg-zinc-200"
                }`}
              />

              <span className="text-xs text-zinc-600">
                {expense.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-zinc-400">
                {expense.percent}%
              </span>

              <span className="text-xs font-semibold text-zinc-800">
                {expense.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================
   QUICK ACTION
========================================================= */

const QuickAction = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <button
      type="button"
      className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-100">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold text-zinc-900">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-zinc-400">
          {description}
        </p>
      </div>

      <ChevronRight
        size={14}
        className="ml-auto shrink-0 text-zinc-300 transition group-hover:text-amber-500"
      />
    </button>
  );
};

/* =========================================================
   RECENT OPERATIONS
========================================================= */

const RecentOperations = () => {
  const operations = [
    {
      type: "deposit",
      title: "Dépôt",
      description: "Jean Kabongo",
      amount: "+$ 2,000.00",
      date: "Aujourd'hui, 09:42",
    },
    {
      type: "expense",
      title: "Dépense",
      description: "Fournitures bureau",
      amount: "-$ 350.00",
      date: "Aujourd'hui, 09:15",
    },
    {
      type: "deposit",
      title: "Dépôt",
      description: "Patrick M.",
      amount: "+$ 1,500.00",
      date: "Hier, 16:20",
    },
    {
      type: "withdrawal",
      title: "Retrait",
      description: "Caisse principale",
      amount: "-$ 200.00",
      date: "Hier, 14:03",
    },
  ];

  return (
    <div className="divide-y divide-zinc-100">
      {operations.map((operation, index) => {
        const positive = operation.type === "deposit";

        return (
          <div
            key={index}
            className="flex items-center gap-4 px-6 py-4 transition hover:bg-zinc-50"
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                positive
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {positive ? (
                <ArrowDownLeft size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-zinc-900">
                {operation.title}
              </p>

              <p className="mt-0.5 text-[10px] text-zinc-400">
                {operation.description}
              </p>
            </div>

            <div className="text-right">
              <p
                className={`text-xs font-bold ${
                  positive
                    ? "text-emerald-600"
                    : "text-zinc-800"
                }`}
              >
                {operation.amount}
              </p>

              <p className="mt-0.5 text-[10px] text-zinc-400">
                {operation.date}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FinanceDashboard;
