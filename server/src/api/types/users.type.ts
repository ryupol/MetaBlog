export interface User {
  name: string;
  profile_url: string;
  email: string;
  password: string;
}

export type UserModel = User & { user_id: string };

export type ShowUser = Omit<User, "password">;

export type UserRegister = { email: string; password: string; passwordConfirm: string };

export type ValidatePassword = User & { passwordConfirm: string };

export type UserLogin = Pick<User, "email" | "password">;

export type UpdateUser = {
  name?: string;
  email?: string;
  profile_url?: string;
};
