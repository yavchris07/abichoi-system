import React from "react";
import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  ShieldAlert,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

type DirectionDashboardProps = {
  token: string;
};

const DirectionDashboard = ({ token }: DirectionDashboardProps) => {
  // TODO:
  // Remplacer ces données par les données de ton API.
  console.log(token);

  const stats = {
    balance: 24850,
    deposits: 18450,
    withdrawals: 7280,
    net: 11170,
    pendingApprovals: 3,
    transactions: 87,
  };

  const recentActivities = [
    {
      id: 1,
      title: "Nouvelle dépense enregistrée",
      description: "Fournitures administratives",
      user: "Jean Dupont",
      time: "Il y a 12 min",
      type: "expense",
    },
    {
      id: 2,
      title: "Dépôt enregistré",
      description: "Alimentation de la caisse",
      user: "Marie Kabeya",
      time: "Il y a 34 min",
      type: "deposit",
    },
    {
      id: 3,
      title: "Utilisateur modifié",
      description: "Modification des accès",
      user: "Administrateur",
      time: "Il y a 1 h",
      type: "system",
    },
    {
      id: 4,
      title: "Retrait enregistré",
      description: "Frais opérationnels",
      user: "Jean Dupont",
      time: "Il y a 2 h",
      type: "withdrawal",
    },
  ];

  const alerts = [
    {
      id: 1,
      title: "Retrait important",
      description: "Un retrait de 2 500 USD attend une validation.",
      type: "warning",
    },
    {
      id: 2,
      title: "Opérations à valider",
      description: "3 opérations nécessitent votre attention.",
      type: "info",
    },
  ];

  const formatMoney = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + ` ${currency}`;
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />

              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                Direction Générale
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Vue d'ensemble
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Supervision globale de l'activité d'ABICHOI.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm">
              <CalendarDays
                size={16}
                className="text-zinc-400"
              />

              <select className="bg-transparent text-xs font-semibold text-zinc-700 outline-none">
                <option>Ce mois</option>
                <option>Cette semaine</option>
                <option>Aujourd'hui</option>
                <option>Cette année</option>
              </select>
            </div>
          </div>
        </div>

        {/* =====================================================
            KPI
        ====================================================== */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* Balance */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold text-zinc-500">
                  Trésorerie totale
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  {formatMoney(stats.balance)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Wallet size={19} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <TrendingUp
                size={14}
                className="text-emerald-600"
              />

              <span className="font-semibold text-emerald-600">
                Solde disponible
              </span>
            </div>
          </div>

          {/* Deposits */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold text-zinc-500">
                  Entrées
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  +{formatMoney(stats.deposits)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <ArrowDownLeft size={19} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <TrendingUp
                size={14}
                className="text-emerald-600"
              />

              <span className="font-semibold text-emerald-600">
                Encaissements
              </span>
            </div>
          </div>

          {/* Withdrawals */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold text-zinc-500">
                  Sorties
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  -{formatMoney(stats.withdrawals)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <ArrowUpRight size={19} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <TrendingDown
                size={14}
                className="text-red-600"
              />

              <span className="font-semibold text-red-600">
                Décaissements
              </span>
            </div>
          </div>

          {/* Net */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">

              <div>
                <p className="text-xs font-semibold text-zinc-500">
                  Solde net
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight text-zinc-950">
                  +{formatMoney(stats.net)}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CircleDollarSign size={19} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs">
              <TrendingUp
                size={14}
                className="text-emerald-600"
              />

              <span className="font-semibold text-emerald-600">
                Période sélectionnée
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAIN GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* ===================================================
              FINANCIAL EVOLUTION
          ==================================================== */}
          <div className="xl:col-span-2 rounded-2xl border border-zinc-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">

              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Évolution financière
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Entrées et sorties de trésorerie
                </p>
              </div>

              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-amber-600"
              >
                Détails
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Chart placeholder */}
            <div className="p-5">

              <div className="flex h-[280px] items-end gap-2 border-b border-l border-zinc-100 px-4 pb-0">

                {[35, 48, 42, 65, 55, 72, 60, 82, 68, 90, 78, 96].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group flex h-full flex-1 items-end justify-center"
                    >
                      <div
                        style={{
                          height: `${height}%`,
                        }}
                        className="w-full max-w-[28px] rounded-t-md bg-amber-400/80 transition group-hover:bg-amber-500"
                      />
                    </div>
                  )
                )}
              </div>

              <div className="mt-3 flex justify-between px-2 text-[10px] font-medium text-zinc-400">
                <span>01</span>
                <span>05</span>
                <span>10</span>
                <span>15</span>
                <span>20</span>
                <span>25</span>
                <span>30</span>
              </div>

              <div className="mt-5 flex items-center justify-center gap-5 text-[11px] font-medium text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Flux financier
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-zinc-300" />
                  Période précédente
                </span>
              </div>
            </div>
          </div>

          {/* ===================================================
              APPROVALS
          ==================================================== */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">

              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  À valider
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Opérations nécessitant votre attention
                </p>
              </div>

              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-amber-100 px-2 text-xs font-bold text-amber-700">
                {stats.pendingApprovals}
              </span>
            </div>

            <div className="divide-y divide-zinc-100">

              <ApprovalItem
                icon={<ArrowUpRight size={16} />}
                title="Retrait"
                description="2 500 USD"
                status="En attente"
              />

              <ApprovalItem
                icon={<FileText size={16} />}
                title="Dépense"
                description="1 200 USD"
                status="En attente"
              />

              <ApprovalItem
                icon={<Wallet size={16} />}
                title="Dépôt exceptionnel"
                description="5 000 USD"
                status="En attente"
              />
            </div>

            <div className="p-4">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-zinc-800"
              >
                Consulter les validations
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM GRID
        ====================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">

          {/* Recent activity */}
          <div className="xl:col-span-2 rounded-2xl border border-zinc-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">

              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Activité récente
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Dernières actions enregistrées
                </p>
              </div>

              <Activity
                size={18}
                className="text-zinc-400"
              />
            </div>

            <div className="divide-y divide-zinc-100">

              {recentActivities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </div>

            <div className="border-t border-zinc-100 p-4">
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-amber-600"
              >
                Voir toute l'activité
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">

              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Alertes
                </h2>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Points nécessitant votre attention
                </p>
              </div>

              <Bell
                size={18}
                className="text-zinc-400"
              />
            </div>

            <div className="space-y-3 p-4">

              {alerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>

            <div className="border-t border-zinc-100 p-4">
              <button
                type="button"
                className="flex items-center gap-1 text-xs font-semibold text-zinc-500 transition hover:text-amber-600"
              >
                Voir toutes les alertes
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================
            QUICK ACCESS
        ====================================================== */}
        <div className="mt-6">

          <div className="mb-3">
            <h2 className="text-sm font-bold text-zinc-900">
              Accès rapide
            </h2>

            <p className="mt-0.5 text-xs text-zinc-500">
              Principales fonctions de la Direction Générale
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <QuickAction
              icon={<Wallet size={18} />}
              title="Situation financière"
              description="Consulter la trésorerie"
            />

            <QuickAction
              icon={<ShieldAlert size={18} />}
              title="Validations"
              description={`${stats.pendingApprovals} opérations en attente`}
            />

            <QuickAction
              icon={<FileText size={18} />}
              title="Rapports"
              description="Consulter les rapports"
            />

            <QuickAction
              icon={<Users size={18} />}
              title="Activité"
              description={`${stats.transactions} opérations`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   APPROVAL ITEM
============================================================ */

type ApprovalItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
};

const ApprovalItem = ({
  icon,
  title,
  description,
  status,
}: ApprovalItemProps) => {
  return (
    <div className="flex items-center gap-3 px-5 py-4">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-zinc-800">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-zinc-500">
          {description}
        </p>
      </div>

      <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
        {status}
      </span>
    </div>
  );
};

/* ============================================================
   ACTIVITY ITEM
============================================================ */

type ActivityItemProps = {
  activity: {
    title: string;
    description: string;
    user: string;
    time: string;
    type: string;
  };
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
  const getIcon = () => {
    switch (activity.type) {
      case "deposit":
        return <ArrowDownLeft size={15} />;

      case "withdrawal":
        return <ArrowUpRight size={15} />;

      case "expense":
        return <FileText size={15} />;

      default:
        return <Users size={15} />;
    }
  };

  return (
    <div className="flex items-center gap-3 px-5 py-3.5">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600">
        {getIcon()}
      </div>

      <div className="min-w-0 flex-1">

        <p className="truncate text-xs font-bold text-zinc-800">
          {activity.title}
        </p>

        <p className="mt-0.5 truncate text-[11px] text-zinc-500">
          {activity.description} · {activity.user}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1 text-[10px] text-zinc-400">
        <Clock3 size={12} />
        {activity.time}
      </div>
    </div>
  );
};

/* ============================================================
   ALERT ITEM
============================================================ */

type AlertItemProps = {
  alert: {
    title: string;
    description: string;
    type: string;
  };
};

const AlertItem = ({ alert }: AlertItemProps) => {
  const isWarning = alert.type === "warning";

  return (
    <div
      className={`rounded-xl border px-4 py-3 ${
        isWarning
          ? "border-red-100 bg-red-50"
          : "border-amber-100 bg-amber-50"
      }`}
    >
      <div className="flex gap-3">

        <div
          className={`mt-0.5 ${
            isWarning ? "text-red-600" : "text-amber-600"
          }`}
        >
          {isWarning ? (
            <ShieldAlert size={17} />
          ) : (
            <Bell size={17} />
          )}
        </div>

        <div>
          <p
            className={`text-xs font-bold ${
              isWarning ? "text-red-900" : "text-amber-900"
            }`}
          >
            {alert.title}
          </p>

          <p
            className={`mt-1 text-[11px] leading-5 ${
              isWarning ? "text-red-700" : "text-amber-700"
            }`}
          >
            {alert.description}
          </p>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   QUICK ACTION
============================================================ */

type QuickActionProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const QuickAction = ({
  icon,
  title,
  description,
}: QuickActionProps) => {
  return (
    <button
      type="button"
      className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:border-amber-300 hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 transition group-hover:bg-amber-50 group-hover:text-amber-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold text-zinc-900">
          {title}
        </p>

        <p className="mt-1 truncate text-[11px] text-zinc-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={15}
        className="ml-auto shrink-0 text-zinc-300 transition group-hover:text-amber-500"
      />
    </button>
  );
};

export default DirectionDashboard;
