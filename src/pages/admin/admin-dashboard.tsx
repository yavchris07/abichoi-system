
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  KeyRound,
  MoreHorizontal,
  Settings,
  ShieldCheck,
  Users,
  UserCog,
  UserPlus,
  Wifi,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight text-zinc-950">
                Administration
              </h1>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                ADMIN
              </span>
            </div>

            <p className="mt-1 text-sm text-zinc-500">
              Supervision et gestion du système Abichoi.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-500 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Système opérationnel
            </div>

            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-900">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-6 p-6 lg:p-8">
        {/* Welcome */}
        <section className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-amber-600">
              Centre de contrôle
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              Bonjour, administrateur.
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Voici l&apos;état actuel de votre environnement.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Clock3 size={15} />
            Dernière actualisation : à l&apos;instant
          </div>
        </section>

        {/* KPI */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Utilisateurs"
            value="48"
            description="+4 ce mois"
            icon={<Users size={20} />}
            href="/admin/users"
          />

          <StatCard
            title="Sessions actives"
            value="12"
            description="2 administrateurs"
            icon={<Wifi size={20} />}
            href="/admin/sessions"
          />

          <StatCard
            title="Événements aujourd'hui"
            value="326"
            description="Activité normale"
            icon={<Activity size={20} />}
            href="/admin/monitoring"
          />

          <StatCard
            title="Alertes"
            value="3"
            description="À vérifier"
            icon={<AlertTriangle size={20} />}
            href="/admin/monitoring"
            warning
          />
        </section>

        {/* Main grid */}
        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          {/* Activity */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div>
                <h3 className="font-semibold text-zinc-950">
                  Activité récente
                </h3>

                <p className="mt-1 text-xs text-zinc-400">
                  Dernières actions enregistrées dans le système
                </p>
              </div>

              <button className="text-xs font-medium text-amber-600 hover:text-amber-700">
                Voir les logs
              </button>
            </div>

            <div className="divide-y divide-zinc-100">
              <ActivityItem
                icon={<UserPlus size={16} />}
                title="Nouvel utilisateur créé"
                description="Jean K. a été ajouté au système"
                time="Il y a 4 min"
                status="success"
              />

              <ActivityItem
                icon={<KeyRound size={16} />}
                title="Connexion administrateur"
                description="Connexion réussie depuis Goma"
                time="Il y a 12 min"
                status="success"
              />

              <ActivityItem
                icon={<UserCog size={16} />}
                title="Rôle modifié"
                description="Le rôle Finance a été attribué à un utilisateur"
                time="Il y a 28 min"
                status="info"
              />

              <ActivityItem
                icon={<AlertTriangle size={16} />}
                title="Tentatives de connexion échouées"
                description="3 tentatives détectées"
                time="Il y a 41 min"
                status="warning"
              />

              <ActivityItem
                icon={<Settings size={16} />}
                title="Paramètre système modifié"
                description="Modification de la configuration"
                time="Il y a 1 h"
                status="info"
              />
            </div>
          </div>

          {/* System status */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-6 py-5">
              <h3 className="font-semibold text-zinc-950">
                État du système
              </h3>

              <p className="mt-1 text-xs text-zinc-400">
                Surveillance des services principaux
              </p>
            </div>

            <div className="space-y-1 p-4">
              <SystemStatus
                title="API"
                description="Services backend"
                status="Opérationnel"
              />

              <SystemStatus
                title="Base de données"
                description="Connexion PostgreSQL"
                status="Opérationnel"
              />

              <SystemStatus
                title="Authentification"
                description="Service de connexion"
                status="Opérationnel"
              />

              <SystemStatus
                title="Sessions"
                description="Gestion des sessions"
                status="Opérationnel"
              />

              <SystemStatus
                title="Journalisation"
                description="Logs & monitoring"
                status="Opérationnel"
              />
            </div>

            <div className="border-t border-zinc-100 px-6 py-4">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <ShieldCheck size={15} className="text-emerald-500" />
                Aucun incident critique détecté
              </div>
            </div>
          </div>
        </section>

        {/* Management */}
        <section>
          <div className="mb-4">
            <h3 className="font-semibold text-zinc-950">
              Administration
            </h3>

            <p className="mt-1 text-xs text-zinc-400">
              Gérez les accès et la configuration de la plateforme.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AdminAction
              icon={<Users size={21} />}
              title="Utilisateurs"
              description="Créer, modifier et désactiver les comptes."
              count="48 utilisateurs"
              href="/admin/users"
            />

            <AdminAction
              icon={<ShieldCheck size={21} />}
              title="Rôles & permissions"
              description="Contrôler les niveaux d'accès du système."
              count="2 rôles actifs"
              href="/admin/roles"
            />

            <AdminAction
              icon={<Wifi size={21} />}
              title="Sessions"
              description="Consulter et gérer les sessions connectées."
              count="12 sessions actives"
              href="/admin/sessions"
            />

            <AdminAction
              icon={<FileText size={21} />}
              title="Monitoring & logs"
              description="Consulter les événements et activités."
              count="326 événements"
              href="/admin/monitoring"
            />

            <AdminAction
              icon={<Settings size={21} />}
              title="Paramètres"
              description="Configurer les paramètres du système."
              count="Configuration"
              href="/admin/settings"
            />

            <AdminAction
              icon={<ShieldCheck size={21} />}
              title="Sécurité"
              description="Surveiller les événements liés à la sécurité."
              count="3 alertes"
              href="/admin/monitoring"
              warning
            />
          </div>
        </section>

        {/* Bottom */}
        <section className="grid gap-6 lg:grid-cols-2">
          {/* Active sessions */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div>
                <h3 className="font-semibold text-zinc-950">
                  Sessions actives
                </h3>

                <p className="mt-1 text-xs text-zinc-400">
                  Utilisateurs actuellement connectés
                </p>
              </div>

              <button className="text-xs font-medium text-amber-600 hover:text-amber-700">
                Toutes les sessions
              </button>
            </div>

            <div className="divide-y divide-zinc-100">
              <SessionItem
                initials="JK"
                name="Jean K."
                role="Finance"
                device="Firefox · Ubuntu"
                location="Goma"
                time="Maintenant"
              />

              <SessionItem
                initials="MW"
                name="Marie W."
                role="Admin"
                device="Chrome · Windows"
                location="Goma"
                time="Il y a 8 min"
              />

              <SessionItem
                initials="PM"
                name="Patrick M."
                role="Finance"
                device="Chrome · Android"
                location="Bukavu"
                time="Il y a 14 min"
              />
            </div>
          </div>

          {/* Security alerts */}
          <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div>
                <h3 className="font-semibold text-zinc-950">
                  Alertes de sécurité
                </h3>

                <p className="mt-1 text-xs text-zinc-400">
                  Événements nécessitant votre attention
                </p>
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                3 alertes
              </span>
            </div>

            <div className="space-y-3 p-5">
              <SecurityAlert
                title="Tentatives de connexion échouées"
                description="3 tentatives sur le compte d'un utilisateur."
                time="Il y a 41 min"
              />

              <SecurityAlert
                title="Session inhabituelle"
                description="Nouvelle connexion depuis un appareil inconnu."
                time="Il y a 1 h"
              />

              <SecurityAlert
                title="Mot de passe expirant"
                description="Un compte nécessite une mise à jour."
                time="Il y a 2 h"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Components                                                                 */
/* -------------------------------------------------------------------------- */

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  warning?: boolean;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  href,
  warning,
}: StatCardProps) => {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            warning
              ? "bg-amber-50 text-amber-600"
              : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {icon}
        </div>

        <ArrowUpRight
          size={17}
          className="text-zinc-300 transition-colors group-hover:text-zinc-700"
        />
      </div>

      <p className="mt-5 text-sm text-zinc-500">{title}</p>

      <div className="mt-1 flex items-end justify-between">
        <p className="text-2xl font-semibold tracking-tight text-zinc-950">
          {value}
        </p>

        <span
          className={`text-xs ${
            warning ? "text-amber-600" : "text-emerald-600"
          }`}
        >
          {description}
        </span>
      </div>
    </a>
  );
};

interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  status: "success" | "info" | "warning";
}

const ActivityItem = ({
  icon,
  title,
  description,
  time,
  status,
}: ActivityItemProps) => {
  const statusStyles = {
    success: "bg-emerald-50 text-emerald-600",
    info: "bg-zinc-100 text-zinc-600",
    warning: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="flex items-center gap-4 px-6 py-4">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${statusStyles[status]}`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-zinc-800">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-zinc-400">
          {description}
        </p>
      </div>

      <span className="shrink-0 text-[11px] text-zinc-400">{time}</span>
    </div>
  );
};

interface SystemStatusProps {
  title: string;
  description: string;
  status: string;
}

const SystemStatus = ({
  title,
  description,
  status,
}: SystemStatusProps) => {
  return (
    <div className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-zinc-50">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
        <CheckCircle2 size={17} className="text-emerald-600" />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-zinc-800">{title}</p>
        <p className="text-xs text-zinc-400">{description}</p>
      </div>

      <span className="text-xs font-medium text-emerald-600">{status}</span>
    </div>
  );
};

interface AdminActionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  count: string;
  href: string;
  warning?: boolean;
}

const AdminAction = ({
  icon,
  title,
  description,
  count,
  href,
  warning,
}: AdminActionProps) => {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            warning
              ? "bg-amber-50 text-amber-600"
              : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {icon}
        </div>

        <ChevronRight
          size={18}
          className="text-zinc-300 transition-all group-hover:translate-x-1 group-hover:text-zinc-700"
        />
      </div>

      <h4 className="mt-5 font-semibold text-zinc-900">{title}</h4>

      <p className="mt-1 min-h-10 text-xs leading-5 text-zinc-500">
        {description}
      </p>

      <div className="mt-4 border-t border-zinc-100 pt-3">
        <span
          className={`text-xs font-medium ${
            warning ? "text-amber-600" : "text-zinc-500"
          }`}
        >
          {count}
        </span>
      </div>
    </a>
  );
};

interface SessionItemProps {
  initials: string;
  name: string;
  role: string;
  device: string;
  location: string;
  time: string;
}

const SessionItem = ({
  initials,
  name,
  role,
  device,
  location,
  time,
}: SessionItemProps) => {
  return (
    <div className="flex items-center gap-3 px-6 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-medium text-white">
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-zinc-800">{name}</p>

          <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-500">
            {role}
          </span>
        </div>

        <p className="mt-0.5 truncate text-xs text-zinc-400">
          {device} · {location}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="hidden text-[11px] text-zinc-400 sm:block">
          {time}
        </span>
      </div>
    </div>
  );
};

interface SecurityAlertProps {
  title: string;
  description: string;
  time: string;
}

const SecurityAlert = ({
  title,
  description,
  time,
}: SecurityAlertProps) => {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
        <AlertTriangle size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-800">{title}</p>

        <p className="mt-1 text-xs leading-5 text-zinc-500">
          {description}
        </p>

        <p className="mt-2 text-[11px] text-zinc-400">{time}</p>
      </div>

      <button className="h-8 w-8 shrink-0 rounded-lg text-zinc-400 transition hover:bg-white hover:text-zinc-700">
        <MoreHorizontal size={17} />
      </button>
    </div>
  );
};

export default AdminDashboard;

