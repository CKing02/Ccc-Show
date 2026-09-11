// English UI strings

import type zh from "./zh";

const en: Record<keyof typeof zh, string> = {
  nav_works: "Works",
  nav_about: "About",
  lang_switch: "中",

  home_hero_label: "Portfolio",
  home_featured_label: "Selected Works",
  home_featured_view_all: "View All Works",
  home_about_label: "About",
  home_about_view: "More About Me",
  home_contact_label: "Contact",
  home_contact_view: "Get in Touch",

  works_title: "Works",
  works_title_en: "WORKS",
  works_count: "{n} pieces",
  works_filter_all: "All",
  works_filter_android: "Android",
  works_filter_web: "Web",
  works_filter_pc: "PC",
  works_section: "Section",
  works_view: "View Work",

  project_role: "Role",
  project_tech: "Tech",
  project_status: "Status",
  project_date: "Date",
  project_status_shipped: "Shipped",
  project_status_ongoing: "Ongoing",
  project_status_archived: "Archived",
  project_download: "Download",
  project_links: "Links",
  project_gallery: "Gallery",
  project_comments: "Comments",
  project_comments_placeholder: "Comments coming soon",
  project_comments_contact: "Reach out via email:",
  project_prev: "Previous",
  project_next: "Next",
  project_back_to_works: "Back to Works",

  about_title: "About",
  about_title_en: "ABOUT",
  about_skills: "Skills",
  about_timeline: "Timeline",

  back_home: "Back Home",
  not_found: "Nothing on display here",
  not_found_label: "404",
  error_label: "Error",
  error_title: "Something went wrong",
  retry: "Retry",
  loading: "Loading",
  built_with: "Next.js · Tailwind · Markdown",
};

export default en;
