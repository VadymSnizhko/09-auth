import { cookies } from "next/headers";

import { api } from "./api";

import type { Note } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await api.get("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await api.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();

  const { data } = await api.get<{ success: boolean }>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data.success;
}
