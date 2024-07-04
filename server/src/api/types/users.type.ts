export interface User {
  name: string;
  profile_url?: string;
  email: string;
  password: string;
}

export type UserModel = User & { user_id: string };

export type ShowUser = Omit<User, "password">;

export type ValidatePassword = User & { passwordConfirm: string };

export type UserLogin = Pick<User, "email" | "password">;
