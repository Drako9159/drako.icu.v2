import {
  IUserGet,
  IUserGetAdmin,
  IUserGetFull,
} from "../../domain/interface/IUserGet";
import { IUserUpdatedResponse } from "../interface/IUserUpdatedResponse";
import { IUserConfirmed } from "../../domain/interface/IUserConfirmed";

export interface UserRepository {
  getUser(): Promise<IUserGet | string>;
  updateUser(): Promise<IUserUpdatedResponse | string>;
  createTokenPasswordReset(email: string): Promise<string>;
  updateConfirmed(token: string): Promise<IUserConfirmed | string>;
}

export interface UserRepositoryAdmin {
  getUsers(): Promise<IUserGetAdmin[]>;
  getUserFull(): Promise<IUserGetFull | string>;
  deleteUser(): Promise<string>;
  updateRole(role: string): Promise<IUserGetAdmin | string>;
  updateBlocked(blocked: boolean): Promise<IUserGetAdmin | string>;
}
