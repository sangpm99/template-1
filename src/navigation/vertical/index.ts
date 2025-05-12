const getNavItems = [
  {
    title: "Dashboard",
    to: { name: "root" },
    icon: { icon: "ri-dashboard-3-line" },
    action: "Read",
    subject: "Permission.Public",
  },
  {
    title: "Tenant",
    icon: { icon: "mdi-handshake-outline" },
    to: { name: "tenant" },
    action: "Read",
    subject: "Permission.Tenant",
  },
  {
    title: "Manage Users",
    icon: { icon: "ri-group-line" },
    action: "Read",
    subject: "Permission.User",
    children: [
      {
        title: "Users",
        to: { name: "accounts-users" },
        action: "Read",
        subject: "Permission.User",
      },
      {
        title: "Roles & Permissions",
        to: { name: "accounts-roles" },
        action: "Read",
        subject: "Permission.Role",
      },
    ],
  },
  {
    title: "Syslog",
    icon: { icon: "ri-pages-line" },
    action: "Read",
    subject: "Permission.Syslog",
    children: [
      {
        title: "AuditLog",
        to: { name: "syslog-auditlog" },
        action: "Read",
        subject: "Permission.Syslog",
      },
      {
        title: "ApplicationLog",
        to: { name: "syslog-applicationlog" },
        action: "Read",
        subject: "Permission.Syslog",
      },
    ],
  },
];

export default getNavItems;
