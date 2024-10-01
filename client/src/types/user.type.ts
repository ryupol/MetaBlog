export interface UserTokenProps {
  id: number;
  email: string;
  name: string;
  profile_url: string;
  iat: number;
  exp: number;
  iss: string;
}
