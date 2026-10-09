
import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Palmtree,
  FileWarning,
  CalendarClock,
  ClipboardCheck,
  UserPlus,
  CalendarDays,
  FileText,
  ChevronRight,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  BriefcaseBusiness,
  Building2,
  TrendingUp,
} from "lucide-react";

type RHDashboardProps = {
  token: string;
};

type RHStats = {
  employees: number;
  newEmployees: number;
  present: number;
  absent: number;
  onLeave: number;
  pendingLeaves: number;
  expiringContracts: number;
  incompleteFiles: number;
  unjustifiedAbsences: number;
  lateEmployees: number;
};

type LeaveRequest = {
  id: string;
  employee: string;
  department: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
};

type RecentActivity = {
  id: string;
  employee: string;
  action: string;
  description: string;
  date: string;
  icon: React.ReactNode;
};

type AlertItem = {
  id: string;
  title: string;
  description: string;
  type: "danger" | "warning" | "info";
};

type Department = {
  name: string;
  count: number;
};

const RHDashboard = ({ token }: RHDashboardProps) => {
  /*
   * TODO:
   * Remplacer ces données par les données retournées par ton API.
   *
   * Exemple :
   * GET /api/rh/dashboard/
   */

  console.log(token)

  const stats: RHStats = {
    employees: 48,
    newEmployees: 2,
    present: 41,
    absent: 3,
    onLeave: 4,
    pendingLeaves: 3,
    expiringContracts: 2,
    incompleteFiles: 4,
    unjustifiedAbsences: 2,
    lateEmployees: 3,
  };

  const leaveRequests: LeaveRequest[] = [
    {
      id: "1",
      employee: "Jean Mukendi",
      department: "Production",
      type: "Congé annuel",
      startDate: "08 sept. 2026",
      endDate: "15 sept. 2026",
      status: "pending",
    },
    {
      id: "2",
      employee: "Marie Kasongo",
      department: "Finance",
      type: "Congé exceptionnel",
      startDate: "10 sept. 2026",
      endDate: "12 sept. 2026",
      status: "pending",
    },
    {
      id: "3",
      employee: "Paul Kabeya",
      department: "Commercial",
      type: "Congé annuel",
      startDate: "14 sept. 2026",
      endDate: "20 sept. 2026",
      status: "pending",
    },
  ];

  const departments: Department[] = [
    {
      name: "Production",
      count: 18,
    },
    {
      name: "Commercial",
      count: 12,
    },
    {
      name: "Finance",
      count: 10,
    },
    {
      name: "Administration",
      count: 8,
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      employee: "Jean Mukendi",
      action: "Nouveau salarié",
      description: "Ajout d'un nouveau dossier employé",
      date: "Il y a 2h",
      icon: <UserPlus size={17} />,
    },
    {
      id: "2",
      employee: "Marie Kasongo",
      action: "Contrat ajouté",
      description: "Nouveau contrat enregistré",
      date: "Il y a 4h",
      icon: <FileText size={17} />,
    },
    {
      id: "3",
      employee: "Paul Kabeya",
      action: "Demande de congé",
      description: "Demande de congé annuel",
      date: "Hier",
      icon: <Palmtree size={17} />,
    },
    {
      id: "4",
      employee: "Sarah Bahati",
      action: "Dossier modifié",
      description: "Informations personnelles mises à jour",
      date: "Hier",
      icon: <Users size={17} />,
    },
  ];

  const alerts: AlertItem[] = [
    {
      id: "1",
      title: "Contrats à renouveler",
      description: "2 contrats arrivent à échéance dans les 30 prochains jours.",
      type: "danger",
    },
    {
      id: "2",
      title: "Dossiers incomplets",
      description: "4 dossiers employés nécessitent des informations.",
      type: "warning",
    },
    {
      id: "3",
      title: "Absences à justifier",
      description: "2 absences n'ont pas encore été justifiées.",
      type: "warning",
    },
  ];

  const period = "Septembre 2026";

  const attendanceRate =
    stats.employees > 0
      ? ((stats.present / stats.employees) * 100).toFixed(1)
      : "0";

  const maxDepartmentCount = Math.max(
    ...departments.map((department) => department.count),
    1
  );

  // const formatDate = (date: string) => {
  //   return new Intl.DateTimeFormat("fr-FR", {
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //   }).format(new Date(date));
  // };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="mx-auto max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8">
        {/* ============================================================
            HEADER
        ============================================================ */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-950 text-amber-400">
                <BriefcaseBusiness size={19} />
              </div>

              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Ressources humaines
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
              Dashboard RH
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
              Vue d'ensemble des ressources humaines de l'entreprise.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500 sm:flex">
              <CalendarDays size={17} />

              <span>{period}</span>
            </div>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              <UserPlus size={17} />
              Ajouter un employé
            </button>
          </div>
        </div>

        {/* ============================================================
            KPI
        ============================================================ */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Employés"
            value={stats.employees}
            subtitle={`+${stats.newEmployees} ce mois`}
            icon={<Users size={21} />}
            iconClass="bg-zinc-100 text-zinc-700"
            trend={<TrendingUp size={14} />}
          />

          <StatCard
            title="Présents aujourd'hui"
            value={stats.present}
            subtitle={`${attendanceRate}% de présence`}
            icon={<UserCheck size={21} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Absents"
            value={stats.absent}
            subtitle={`${stats.unjustifiedAbsences} à justifier`}
            icon={<UserX size={21} />}
            iconClass="bg-red-50 text-red-600"
          />

          <StatCard
            title="En congé"
            value={stats.onLeave}
            subtitle={`${stats.pendingLeaves} demandes en attente`}
            icon={<Palmtree size={21} />}
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        {/* ============================================================
            MAIN GRID
        ============================================================ */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* ==========================================================
              PRESENCE
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  Présence aujourd'hui
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Situation des employés pour la journée.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Clock3 size={19} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <AttendanceCard
                label="Présents"
                value={stats.present}
                total={stats.employees}
                percentage={attendanceRate}
                icon={<UserCheck size={18} />}
                className="bg-emerald-50 text-emerald-700"
              />

              <AttendanceCard
                label="Absents"
                value={stats.absent}
                total={stats.employees}
                percentage={(
                  (stats.absent / stats.employees) *
                  100
                ).toFixed(1)}
                icon={<UserX size={18} />}
                className="bg-red-50 text-red-700"
              />

              <AttendanceCard
                label="En retard"
                value={stats.lateEmployees}
                total={stats.employees}
                percentage={(
                  (stats.lateEmployees / stats.employees) *
                  100
                ).toFixed(1)}
                icon={<Clock3 size={18} />}
                className="bg-amber-50 text-amber-700"
              />
            </div>

            {/* Fake weekly chart */}
            <div className="mt-6 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-zinc-800">
                    Évolution de la présence
                  </p>

                  <p className="text-xs text-zinc-500">
                    Cette semaine
                  </p>
                </div>

                <span className="text-sm font-semibold text-emerald-600">
                  86,2%
                </span>
              </div>

              <div className="flex h-40 items-end gap-2 sm:gap-4">
                {[
                  { day: "Lun", value: 88 },
                  { day: "Mar", value: 92 },
                  { day: "Mer", value: 84 },
                  { day: "Jeu", value: 89 },
                  { day: "Ven", value: 86 },
                  { day: "Sam", value: 62 },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex h-full flex-1 flex-col items-center justify-end gap-2"
                  >
                    <div className="flex h-full w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-zinc-900 transition hover:bg-amber-500"
                        style={{
                          height: `${item.value}%`,
                        }}
                        title={`${item.value}%`}
                      />
                    </div>

                    <span className="text-[11px] font-medium text-zinc-400">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ==========================================================
              A TRAITER
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  À traiter
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Les éléments nécessitant votre attention.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <ClipboardCheck size={19} />
              </div>
            </div>

            <div className="space-y-3">
              <TaskCard
                title="Demandes de congé"
                value={stats.pendingLeaves}
                description="en attente de validation"
                icon={<Palmtree size={18} />}
                className="border-amber-200 bg-amber-50/50"
              />

              <TaskCard
                title="Contrats"
                value={stats.expiringContracts}
                description="arrivent bientôt à échéance"
                icon={<FileWarning size={18} />}
                className="border-red-200 bg-red-50/50"
              />

              <TaskCard
                title="Dossiers incomplets"
                value={stats.incompleteFiles}
                description="nécessitent une mise à jour"
                icon={<FileText size={18} />}
                className="border-orange-200 bg-orange-50/50"
              />

              <TaskCard
                title="Absences"
                value={stats.unjustifiedAbsences}
                description="restent à justifier"
                icon={<UserX size={18} />}
                className="border-zinc-200 bg-zinc-50"
              />
            </div>
          </section>
        </div>

        {/* ============================================================
            SECOND GRID
        ============================================================ */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ==========================================================
              DEPARTMENTS
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  Effectifs par département
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Répartition actuelle des employés.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
                <Building2 size={19} />
              </div>
            </div>

            <div className="space-y-5">
              {departments.map((department) => {
                const percentage =
                  (department.count / maxDepartmentCount) * 100;

                return (
                  <div key={department.name}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-700">
                        {department.name}
                      </span>

                      <span className="text-sm font-semibold text-zinc-950">
                        {department.count}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-900 transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              Voir les départements
              <ChevronRight size={16} />
            </button>
          </section>

          {/* ==========================================================
              CONGES
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  Demandes de congé
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Demandes nécessitant une validation.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <CalendarClock size={19} />
              </div>
            </div>

            <div className="space-y-3">
              {leaveRequests.map((request) => (
                <LeaveRequestItem
                  key={request.id}
                  request={request}
                />
              ))}
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              Voir toutes les demandes
              <ChevronRight size={16} />
            </button>
          </section>
        </div>

        {/* ============================================================
            ACTIVITY + ALERTS
        ============================================================ */}
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* ==========================================================
              ACTIVITY
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm xl:col-span-2">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  Activité RH récente
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Les dernières opérations effectuées dans le module RH.
                </p>
              </div>

              <button
                type="button"
                className="hidden items-center gap-1 text-sm font-semibold text-zinc-600 hover:text-zinc-950 sm:flex"
              >
                Tout voir
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="divide-y divide-zinc-100">
              {recentActivities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  activity={activity}
                />
              ))}
            </div>
          </section>

          {/* ==========================================================
              ALERTS
          ========================================================== */}
          <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="font-semibold text-zinc-950">
                  Alertes RH
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Points nécessitant une attention.
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={19} />
              </div>
            </div>

            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                />
              ))}
            </div>
          </section>
        </div>

        {/* ============================================================
            QUICK ACTIONS
        ============================================================ */}
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="font-semibold text-zinc-950">
              Accès rapides
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Accédez rapidement aux principales fonctionnalités RH.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <QuickAction
              title="Ajouter un employé"
              description="Créer un nouveau dossier"
              icon={<UserPlus size={20} />}
            />

            <QuickAction
              title="Présence"
              description="Consulter le pointage"
              icon={<Clock3 size={20} />}
            />

            <QuickAction
              title="Congés"
              description="Gérer les demandes"
              icon={<Palmtree size={20} />}
            />

            <QuickAction
              title="Contrats"
              description="Gérer les contrats"
              icon={<FileText size={20} />}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

/* ==========================================================================
   STAT CARD
========================================================================== */

type StatCardProps = {
  title: string;
  value: number | string;
  subtitle: string;
  icon: React.ReactNode;
  iconClass: string;
  trend?: React.ReactNode;
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  iconClass,
  trend,
}: StatCardProps) => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        {trend && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600">
            {trend}
            +{value === 48 ? "4.3%" : ""}
          </span>
        )}
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-zinc-500">{title}</p>

        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-950">
          {value}
        </p>

        <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
      </div>
    </div>
  );
};

/* ==========================================================================
   ATTENDANCE CARD
========================================================================== */

type AttendanceCardProps = {
  label: string;
  value: number;
  total: number;
  percentage: string;
  icon: React.ReactNode;
  className: string;
};

const AttendanceCard = ({
  label,
  value,
  total,
  percentage,
  icon,
  className,
}: AttendanceCardProps) => {
  const progress = total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="rounded-xl border border-zinc-100 bg-white p-4">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${className}`}
        >
          {icon}
        </div>

        <span className="text-xs font-semibold text-zinc-400">
          {percentage}%
        </span>
      </div>

      <div className="mt-4">
        <p className="text-sm text-zinc-500">{label}</p>

        <p className="mt-1 text-2xl font-bold text-zinc-950">
          {value}
        </p>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-100">
        <div
          className="h-full rounded-full bg-current"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   TASK CARD
========================================================================== */

type TaskCardProps = {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  className: string;
};

const TaskCard = ({
  title,
  value,
  description,
  icon,
  className,
}: TaskCardProps) => {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition hover:shadow-sm ${className}`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-zinc-700 shadow-sm">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-zinc-800">
          {title}
        </p>

        <p className="truncate text-xs text-zinc-500">
          {description}
        </p>
      </div>

      <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-white px-2 text-xs font-bold text-zinc-900 shadow-sm">
        {value}
      </span>
    </button>
  );
};

/* ==========================================================================
   LEAVE REQUEST
========================================================================== */

type LeaveRequestItemProps = {
  request: LeaveRequest;
};

const LeaveRequestItem = ({ request }: LeaveRequestItemProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border border-zinc-100 p-3 text-left transition hover:border-zinc-200 hover:bg-zinc-50"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-700">
        {request.employee
          .split(" ")
          .map((name) => name[0])
          .join("")
          .slice(0, 2)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-semibold text-zinc-800">
            {request.employee}
          </p>

          <span className="shrink-0 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-semibold text-amber-700">
            En attente
          </span>
        </div>

        <p className="mt-0.5 truncate text-xs text-zinc-500">
          {request.type} · {request.department}
        </p>

        {/* <p className="mt-1 text-[11px] text-zinc-400">
          {formrequest.startDate} → {request.endDate}
        </p> */}
      </div>

      <ChevronRight
        size={16}
        className="shrink-0 text-zinc-400"
      />
    </button>
  );
};

/* ==========================================================================
   ACTIVITY ITEM
========================================================================== */

type ActivityItemProps = {
  activity: RecentActivity;
};

const ActivityItem = ({ activity }: ActivityItemProps) => {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700">
        {activity.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <p className="text-sm font-semibold text-zinc-800">
            {activity.employee}
          </p>

          <span className="text-zinc-300">·</span>

          <p className="text-sm text-zinc-600">
            {activity.action}
          </p>
        </div>

        <p className="mt-0.5 text-xs text-zinc-400">
          {activity.description}
        </p>
      </div>

      <span className="shrink-0 text-xs text-zinc-400">
        {activity.date}
      </span>
    </div>
  );
};

/* ==========================================================================
   ALERT CARD
========================================================================== */

type AlertCardProps = {
  alert: AlertItem;
};

const AlertCard = ({ alert }: AlertCardProps) => {
  const styles = {
    danger: {
      wrapper: "border-red-200 bg-red-50/50",
      icon: "bg-red-100 text-red-600",
      title: "text-red-900",
    },
    warning: {
      wrapper: "border-amber-200 bg-amber-50/50",
      icon: "bg-amber-100 text-amber-600",
      title: "text-amber-900",
    },
    info: {
      wrapper: "border-blue-200 bg-blue-50/50",
      icon: "bg-blue-100 text-blue-600",
      title: "text-blue-900",
    },
  };

  const style = styles[alert.type];

  return (
    <button
      type="button"
      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition hover:shadow-sm ${style.wrapper}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.icon}`}
      >
        {alert.type === "danger" ? (
          <AlertTriangle size={17} />
        ) : alert.type === "warning" ? (
          <FileWarning size={17} />
        ) : (
          <CheckCircle2 size={17} />
        )}
      </div>

      <div className="min-w-0">
        <p className={`text-sm font-semibold ${style.title}`}>
          {alert.title}
        </p>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {alert.description}
        </p>
      </div>
    </button>
  );
};

/* ==========================================================================
   QUICK ACTION
========================================================================== */

type QuickActionProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

const QuickAction = ({
  title,
  description,
  icon,
}: QuickActionProps) => {
  return (
    <button
      type="button"
      className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-md"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-amber-400 transition group-hover:bg-amber-400 group-hover:text-zinc-950">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-zinc-900">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-zinc-500">
          {description}
        </p>
      </div>

      <ChevronRight
        size={17}
        className="text-zinc-300 transition group-hover:translate-x-0.5 group-hover:text-zinc-700"
      />
    </button>
  );
};

export default RHDashboard;

