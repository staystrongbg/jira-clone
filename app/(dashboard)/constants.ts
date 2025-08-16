import { GoCheckCircle, GoHome } from "react-icons/go";
import { Settings, UsersIcon } from "lucide-react";

export const routes = [
  {
    label: "Home",
    href: "/",
    description: "Monitor all of your projects and tasks here",
    icon: GoHome,
  },
  {
    label: "My Tasks",
    href: "/tasks",
    description: "Monitor all of your tasks",
    icon: GoCheckCircle,
  },
  {
    label: "Settings",
    href: "/settings",
    description: "Manage your account settings",
    icon: Settings,
  },
  {
    label: "Members",
    href: "/members",
    description: "Manage your team members",
    icon: UsersIcon,
  },
];
