export const siteConfig = {
  name: "SciPaper AI",
  description: "Your AI Research Partner for Flawless Scientific Publications",
  url: "https://scipaper.ai",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/scipaperai",
    github: "https://github.com/scipaperai",
    linkedin: "https://linkedin.com/company/scipaperai",
    discord: "https://discord.gg/scipaperai",
  },
};

export const marketingConfig = {
  mainNav: [
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Docs",
      href: "/docs",
    },
  ],
};

export const dashboardConfig = {
  sidebarNav: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: "LayoutDashboard",
        },
        {
          title: "Analytics",
          href: "/dashboard/analysis",
          icon: "BarChart3",
        },
      ],
    },
    {
      title: "Documents",
      items: [
        {
          title: "Upload",
          href: "/dashboard/upload",
          icon: "Upload",
          badge: true,
        },
        {
          title: "All Documents",
          href: "/dashboard/documents",
          icon: "FileText",
        },
        {
          title: "Templates",
          href: "/dashboard/templates",
          icon: "Layout",
        },
      ],
    },
    {
      title: "Tools",
      items: [
        {
          title: "LaTeX Checker",
          href: "/dashboard/latex",
          icon: "Code",
        },
        {
          title: "Formatter",
          href: "/dashboard/formatter",
          icon: "Paintbrush",
        },
        {
          title: "Citations",
          href: "/dashboard/citations",
          icon: "Link",
        },
        {
          title: "Reports",
          href: "/dashboard/reports",
          icon: "FileBarChart",
        },
      ],
    },
    {
      title: "Team",
      items: [
        {
          title: "Workspace",
          href: "/dashboard/workspace",
          icon: "Users",
        },
        {
          title: "Activity",
          href: "/dashboard/activity",
          icon: "Activity",
        },
      ],
    },
  ],
};
