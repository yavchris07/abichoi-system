import { useState } from "react";
import {
  Bell,
  Check,
  ChevronRight,
  Clock3,
  Globe2,
  History,
  LockKeyhole,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

type SettingsSection =
  | "general"
  | "security"
  | "sessions"
  | "notifications"
  | "logs"
  | "system";

const AdminSettingsPage = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [settings, setSettings] = useState({
    companyName: "ABICHOI SARL",
    timezone: "Africa/Kigali",
    dateFormat: "DD/MM/YYYY",

    sessionDuration: "8",
    maxLoginAttempts: "5",

    sessionAlert: true,
    securityAlert: true,
    systemNotification: true,

    auditLogs: true,
    loginLogs: true,
  });

  const updateSetting = (
    key: keyof typeof settings,
    value: string | boolean
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings:", settings);

    // TODO:
    // await updateSettings(settings)
  };

  const sections = [
    {
      id: "general" as SettingsSection,
      label: "Général",
      description: "Informations et préférences",
      icon: Globe2,
    },
    {
      id: "security" as SettingsSection,
      label: "Sécurité",
      description: "Authentification et accès",
      icon: LockKeyhole,
    },
    {
      id: "sessions" as SettingsSection,
      label: "Sessions",
      description: "Gestion des sessions",
      icon: Clock3,
    },
    {
      id: "notifications" as SettingsSection,
      label: "Notifications",
      description: "Alertes du système",
      icon: Bell,
    },
    {
      id: "logs" as SettingsSection,
      label: "Journalisation",
      description: "Logs et traçabilité",
      icon: History,
    },
    {
      id: "system" as SettingsSection,
      label: "Système",
      description: "Configuration technique",
      icon: SlidersHorizontal,
    },
  ];

  return (
    <div className="min-h-full bg-zinc-50 p-4 md:p-6">
      {/* Page header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <Settings size={19} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-zinc-950">
              Paramètres
            </h1>

            <p className="mt-0.5 text-xs text-zinc-400">
              Configurez le comportement général d'ABICHOI SYSTEM.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[240px_1fr]">
        {/* Settings navigation */}
        <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
          <div className="px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
              Configuration
            </p>
          </div>

          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const active =
                activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    setActiveSection(section.id)
                  }
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    active
                      ? "bg-amber-50 text-amber-700"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? "bg-amber-100 text-amber-600"
                        : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    <Icon size={15} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold ${
                        active
                          ? "text-amber-800"
                          : "text-zinc-700"
                      }`}
                    >
                      {section.label}
                    </p>

                    <p className="mt-0.5 truncate text-[10px] text-zinc-400">
                      {section.description}
                    </p>
                  </div>

                  {active && (
                    <ChevronRight
                      size={14}
                      className="shrink-0 text-amber-500"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {activeSection === "general" && (
            <GeneralSettings
              settings={settings}
              updateSetting={updateSetting}
            />
          )}

          {activeSection === "security" && (
            <SecuritySettings
              settings={settings}
              updateSetting={updateSetting}
            />
          )}

          {activeSection === "sessions" && (
            <SessionSettings
              settings={settings}
              updateSetting={updateSetting}
            />
          )}

          {activeSection === "notifications" && (
            <NotificationSettings
              settings={settings}
              updateSetting={updateSetting}
            />
          )}

          {activeSection === "logs" && (
            <LogSettings
              settings={settings}
              updateSetting={updateSetting}
            />
          )}

          {activeSection === "system" && (
            <SystemSettings />
          )}

          {/* Save */}
          {activeSection !== "system" && (
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-sm">
              <p className="text-[11px] text-zinc-400">
                Les modifications doivent être enregistrées.
              </p>

              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-zinc-950 shadow-sm shadow-amber-500/20 transition hover:bg-amber-400"
              >
                <Save size={15} />
                Enregistrer
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

type SettingsProps = {
  settings: {
    companyName: string;
    timezone: string;
    dateFormat: string;
    sessionDuration: string;
    maxLoginAttempts: string;
    sessionAlert: boolean;
    securityAlert: boolean;
    systemNotification: boolean;
    auditLogs: boolean;
    loginLogs: boolean;
  };
  updateSetting: (
    key: keyof SettingsProps["settings"],
    value: string | boolean
  ) => void;
};

/* =========================================================
   GENERAL
========================================================= */

const GeneralSettings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  return (
    <SettingsCard
      icon={<Globe2 size={18} />}
      title="Paramètres généraux"
      description="Les informations générales utilisées par le système."
    >
      <div className="space-y-5">
        <SettingInput
          label="Nom de l'organisation"
          description="Nom affiché dans l'application."
          value={settings.companyName}
          onChange={(value) =>
            updateSetting("companyName", value)
          }
        />

        <SettingSelect
          label="Fuseau horaire"
          description="Utilisé pour les dates, sessions et journaux."
          value={settings.timezone}
          onChange={(value) =>
            updateSetting("timezone", value)
          }
          options={[
            {
              value: "Africa/Kigali",
              label: "Africa/Kigali (UTC+2)",
            },
            {
              value: "Africa/Kinshasa",
              label: "Africa/Kinshasa (UTC+1)",
            },
          ]}
        />

        <SettingSelect
          label="Format de date"
          description="Format utilisé dans l'interface."
          value={settings.dateFormat}
          onChange={(value) =>
            updateSetting("dateFormat", value)
          }
          options={[
            {
              value: "DD/MM/YYYY",
              label: "31/12/2026",
            },
            {
              value: "YYYY-MM-DD",
              label: "2026-12-31",
            },
          ]}
        />
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   SECURITY
========================================================= */

const SecuritySettings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  return (
    <SettingsCard
      icon={<LockKeyhole size={18} />}
      title="Sécurité"
      description="Contrôlez les règles d'accès et d'authentification."
    >
      <div className="space-y-5">
        <SettingSelect
          label="Tentatives de connexion"
          description="Nombre maximal de tentatives avant blocage."
          value={settings.maxLoginAttempts}
          onChange={(value) =>
            updateSetting("maxLoginAttempts", value)
          }
          options={[
            { value: "3", label: "3 tentatives" },
            { value: "5", label: "5 tentatives" },
            { value: "10", label: "10 tentatives" },
          ]}
        />

        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck
              size={17}
              className="mt-0.5 shrink-0 text-amber-600"
            />

            <div>
              <p className="text-xs font-semibold text-amber-800">
                Recommandation de sécurité
              </p>

              <p className="mt-1 text-[11px] leading-5 text-amber-700/80">
                Conservez un nombre limité de tentatives de
                connexion et surveillez les événements suspects
                depuis la section Monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   SESSIONS
========================================================= */

const SessionSettings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  return (
    <SettingsCard
      icon={<Clock3 size={18} />}
      title="Sessions"
      description="Configurez la durée et le comportement des sessions."
    >
      <div className="space-y-5">
        <SettingSelect
          label="Durée maximale d'une session"
          description="Après cette durée, l'utilisateur devra se reconnecter."
          value={settings.sessionDuration}
          onChange={(value) =>
            updateSetting("sessionDuration", value)
          }
          options={[
            { value: "1", label: "1 heure" },
            { value: "4", label: "4 heures" },
            { value: "8", label: "8 heures" },
            { value: "12", label: "12 heures" },
            { value: "24", label: "24 heures" },
          ]}
        />

        <SettingToggle
          label="Alerte lors d'une nouvelle session"
          description="Notifier l'administration lorsqu'un compte ouvre une nouvelle session."
          enabled={settings.sessionAlert}
          onChange={(value) =>
            updateSetting("sessionAlert", value)
          }
        />
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   NOTIFICATIONS
========================================================= */

const NotificationSettings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  return (
    <SettingsCard
      icon={<Bell size={18} />}
      title="Notifications"
      description="Définissez les événements qui doivent générer des alertes."
    >
      <div className="space-y-2">
        <SettingToggle
          label="Alertes de sécurité"
          description="Tentatives de connexion suspectes, blocages et événements sensibles."
          enabled={settings.securityAlert}
          onChange={(value) =>
            updateSetting("securityAlert", value)
          }
        />

        <SettingToggle
          label="Notifications système"
          description="Informations importantes concernant le fonctionnement du système."
          enabled={settings.systemNotification}
          onChange={(value) =>
            updateSetting(
              "systemNotification",
              value
            )
          }
        />
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   LOGS
========================================================= */

const LogSettings = ({
  settings,
  updateSetting,
}: SettingsProps) => {
  return (
    <SettingsCard
      icon={<History size={18} />}
      title="Journalisation"
      description="Contrôlez les événements enregistrés dans les journaux."
    >
      <div className="space-y-2">
        <SettingToggle
          label="Journal d'audit"
          description="Enregistrer les actions administratives et les modifications sensibles."
          enabled={settings.auditLogs}
          onChange={(value) =>
            updateSetting("auditLogs", value)
          }
        />

        <SettingToggle
          label="Journal des connexions"
          description="Enregistrer les connexions, déconnexions et événements d'authentification."
          enabled={settings.loginLogs}
          onChange={(value) =>
            updateSetting("loginLogs", value)
          }
        />
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   SYSTEM
========================================================= */

const SystemSettings = () => {
  return (
    <SettingsCard
      icon={<SlidersHorizontal size={18} />}
      title="Système"
      description="Informations techniques sur ABICHOI SYSTEM."
    >
      <div className="space-y-3">
        <InfoRow
          label="Application"
          value="ABICHOI SYSTEM"
        />

        <InfoRow
          label="Organisation"
          value="ABICHOI SARL"
        />

        <InfoRow
          label="Environnement"
          value="Production"
        />

        <InfoRow
          label="Version"
          value="1.0.0"
        />

        <InfoRow
          label="Statut"
          value="Opérationnel"
          success
        />
      </div>

      <div className="mt-5 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Zone technique
        </p>

        <p className="mt-2 text-[11px] leading-5 text-zinc-500">
          Les paramètres techniques sensibles doivent être
          configurés côté serveur et ne devraient pas être
          exposés directement dans l'interface administrateur.
        </p>
      </div>
    </SettingsCard>
  );
};

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

const SettingsCard = ({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center gap-3 border-b border-zinc-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
          {icon}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-zinc-950">
            {title}
          </h2>

          <p className="mt-0.5 text-[11px] text-zinc-400">
            {description}
          </p>
        </div>
      </div>

      <div className="px-6 py-5">{children}</div>
    </section>
  );
};

const SettingInput = ({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold text-zinc-800">
          {label}
        </p>

        <p className="mt-1 max-w-md text-[11px] leading-5 text-zinc-400">
          {description}
        </p>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 sm:w-64"
      />
    </div>
  );
};

const SettingSelect = ({
  label,
  description,
  value,
  onChange,
  options,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) => {
  return (
    <div className="flex flex-col gap-3 border-b border-zinc-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold text-zinc-800">
          {label}
        </p>

        <p className="mt-1 max-w-md text-[11px] leading-5 text-zinc-400">
          {description}
        </p>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs text-zinc-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 sm:w-64"
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const SettingToggle = ({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-zinc-100 px-4 py-4 transition hover:bg-zinc-50">
      <div>
        <p className="text-xs font-semibold text-zinc-800">
          {label}
        </p>

        <p className="mt-1 max-w-lg text-[11px] leading-5 text-zinc-400">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-pressed={enabled}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled
            ? "bg-amber-500"
            : "bg-zinc-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled
              ? "left-6"
              : "left-1"
          }`}
        />

        {enabled && (
          <Check
            size={10}
            className="absolute left-1.5 top-1.5 text-amber-600"
          />
        )}
      </button>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
  success,
}: {
  label: string;
  value: string;
  success?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between border-b border-zinc-100 py-3 last:border-0">
      <span className="text-xs text-zinc-400">
        {label}
      </span>

      <span
        className={`text-xs font-semibold ${
          success
            ? "text-emerald-600"
            : "text-zinc-800"
        }`}
      >
        {success && (
          <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        )}

        {value}
      </span>
    </div>
  );
};

export default AdminSettingsPage;
