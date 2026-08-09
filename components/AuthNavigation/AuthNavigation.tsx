"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import css from "./AuthNavigation.module.css";

import { logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const AuthNavigation = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    try {
      await logout();
      clearIsAuthenticated();
      router.push("/sign-in");
    } catch {
      console.error("Logout failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/sign-in" className={css.navigationLink}>
            Login
          </Link>
        </li>

        <li className={css.navigationItem}>
          <Link href="/sign-up" className={css.navigationLink}>
            Sign up
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>

        <button
          type="button"
          className={css.logoutButton}
          onClick={handleLogout}
        >
          Logout
        </button>
      </li>
    </>
  );
};

export default AuthNavigation
