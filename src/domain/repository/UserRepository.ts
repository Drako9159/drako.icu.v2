import mongoose from "mongoose";
import IUser from "../interface/IUser";
import UserModel from "../model/UserModel";

export interface UserRepository {
  findUserById?: (id: string) => IUser;
}
