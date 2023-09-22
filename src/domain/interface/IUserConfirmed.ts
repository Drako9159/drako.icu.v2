export interface IUserConfirmed {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  blocked: Boolean;
  confirmed: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
