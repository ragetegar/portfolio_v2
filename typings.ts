export interface IUrl {
  url: string;
}

export interface IText {
  text: string;
}

export interface IProjects {
  id: string;
  title: string;
  description: string;
  categories: string[];  // Supports multiple categories
  techStack: Array<IText>;  // Labels for tech stack
  image: string[];  // Updated for array of image URLs
  linkUrl?: string;  // Link to the project (optional)
  demoLink?: string;  // Demo link (optional)
}

export interface ISkills {
  id: string;
  uniqueId: number;
  proficient: boolean;
  skill: string;
  url: string;
  fieldType: string | null;
  image: IUrl;
}

export interface IJobs {
  id: string;
  company: string;
  designation: string;
  companyLinkedin: string;
  companyUrl: string;
  from: string;
  to: string;
  logo: IUrl;
}

export interface IFormFields {
  value: string;
  errorMessage: string;
}

export interface IFormData {
  name: IFormFields;
  email: IFormFields;
  message: IFormFields;
}

export const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

export type Theme = "light" | "dark";

export enum Months {
  Jan = 1,
  Feb = 2,
  Mar = 3,
  Apr = 4,
  May = 5,
  Jun = 6,
  Jul = 7,
  Aug = 8,
  Sep = 9,
  Oct = 10,
  Nov = 11,
  Dec = 12,
}

export const SKILLSET = {
  LANGUAGES: "languages",
  FRONTEND: "frontend",
  UI_LIBRARIES: "uilibraries",
  BACKEND: "backend",
  DATABASE: "database",
  HEADLESS_CMS: "headless cms",
  TESTING: "testing",
  TOOLS: "tools",
};

export const TECHSTACK = {
  ALL: "all",
  CPP: "c++",
  PHP: "php",
  JAVASCRIPT: "javascript",
  TYPESCRIPT: "typescript",
  REACT: "react",
  NEXTJS: "nextjs",
};

export const SECTION = {
  ABOUT: "about",
  JOBS: "jobs",
  PROJECTS: "projects",
  SKILLS: "skills",
  CONTACT: "contact",
};
