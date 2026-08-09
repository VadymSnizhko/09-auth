"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import css from "./EditProfilePage.module.css";

import { updateMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const EditProfile = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [username, setUsername] = useState(user?.username ?? "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setError("");
      setIsLoading(true);

      const updatedUser = await updateMe({ username });

      setUser(updatedUser);

      router.push("/profile");
    } catch {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (!user) {
    return null;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={css.input}
              required
            />
          </div>

          <p>Email: {user.email}</p>

          {error && <p>{error}</p>}

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfile
