import { api } from "./api";
import type { Note, CreateNote, NoteTag } from "@/types/note";
import type { User } from "@/types/user";

interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: NoteTag;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface UpdateUserData {
  username: string;
}

export const fetchNotes = async ({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      search,
      tag,
    },
  });

  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
};

export const createNote = async (
  newNote: CreateNote
): Promise<Note> => {
  const { data } = await api.post<Note>("/notes", newNote);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
};

export const register = async (
  credentials: AuthCredentials
): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", credentials);

  return data;
};

export const login = async (
  credentials: AuthCredentials
): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", credentials);

  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await api.get<{ success: boolean }>("/auth/session");

  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");

  return data;
};

export const updateMe = async (
  userData: UpdateUserData
): Promise<User> => {
  const { data } = await api.patch<User>("/users/me", userData);

  return data;
};