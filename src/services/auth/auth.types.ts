/* Authtype   */
export type LoginAuthModelType = {
  email: string;
  password: string;
};
export type LoginResAuthModelType = {
  status: boolean;
  loginData?: {
    token: string;
  };
};
