import UserRepository from "../repository/UserRepository";
import IUser from "../interface/IUser";
import UserModel from "../model/UserModel";

export async function getUser(id: string) {
  const user = await UserModel.findById({ _id: id });
  return user as IUser;
}
