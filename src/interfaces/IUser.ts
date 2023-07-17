export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  type: string,
  updatedAt: Date,
  save(): string;
}
