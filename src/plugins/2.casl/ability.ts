import type { User } from "@/types/authorize";
import { defineAbility } from "@casl/ability";

interface Ability {
  action: string;
  subject: string;
}

export default defineAbility((can) => {
  const userData: string | null = localStorage.getItem(
    import.meta.env.VITE_LOCALSTORAGE_USER_NAME
  );

  if (userData) {
    const userObj: User = JSON.parse(userData);

    const permits: Ability[] = userObj.permissions.map((permit: string) => {
      const parts: string[] = permit.split(".");
      const action: string = parts.pop() ?? "";
      const subject: string = parts.join(".");

      return { action, subject };
    });

    can("Read", "Permission.Public");

    permits.forEach((permit: Ability) => {
      can(permit.action, permit.subject);
    });
  }
});
