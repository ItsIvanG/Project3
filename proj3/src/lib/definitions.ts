export interface Register {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginAcc {
  email: string;
  password: string;
}

export interface ForgotPassword {
  email: string;
}

export interface PasswordReset {
  otp: string;
}

export interface SetNewPassword {
  password: string;
  confirmpass: string;
}
