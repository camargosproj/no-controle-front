export type AuthLogin = {
  email: string;
  password: string;
};

export type SignInResponse = {
  id: string;
  name: string;
  email: string;
  validated: boolean;
  accessToken: string;
};

export type AuthContextType = {
  user: SignInResponse | null;
  login: (props: AuthLogin) => Promise<void>;
  logout: () => Promise<void>;
  getCookieData: () => SignInResponse | null;
};
