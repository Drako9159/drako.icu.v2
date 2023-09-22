import { IUserGet } from "../../domain/interface/IUserGet";
import { IUserUpdated } from "../../domain/interface/IUserUpdated";
import { IUserConfirmed } from "../../domain/interface/IUserConfirmed";

export interface UserRepository {
  getUser(): Promise<IUserGet | string>;
  updateUser(): Promise<IUserUpdated | string>;
  createTokenPasswordReset(email: string): Promise<string>;
  updateConfirmed(token: string): Promise<IUserConfirmed | string>;
}
