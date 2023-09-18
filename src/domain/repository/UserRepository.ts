import mongoose from "mongoose";
import IUser from "../interface/IUser";
import UserModel from "../model/UserModel";

export default interface UserRepository {
  findUserById?: (id: string) => IUser;
}
