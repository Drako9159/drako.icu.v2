export interface IUserGet {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUserGetAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmed: Boolean;
  role: string;
  blocked: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserGetFull {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  resetPasswordToken?: string;
  confirmationToken?: string;
  confirmed: Boolean;
  role: string;
  blocked: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
