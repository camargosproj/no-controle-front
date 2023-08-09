export type AuthLogin = {
  email: string;
  password: string;
};

export type SinginResponse = {
  id: string;
  name: string;
  email: string;
  validated: boolean;
  accessToken: string;
};

export type AuthContextType = {
  user: SinginResponse | null;
  login: (props: AuthLogin) => Promise<void>;
  logout: () => Promise<void>;
  getCookieData: () => SinginResponse | null;
};
