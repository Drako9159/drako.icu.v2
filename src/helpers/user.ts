import { User } from "../models/User";
import { IUser } from "interfaces/IUser";

class Users {
  private id: string | undefined;
  private firstName: string | undefined;
  private lastName: string | undefined;
  private type: string | undefined;

  constructor(
    id?: string,
    firstName?: string,
    lastName?: string,
    type?: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.type = type;
  }

  static async getAllUsers() {
    const users = await User.find({});
    const response = users.map((e) => {
      const obj = {
        id: e._id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        type: e.type,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      };
      return obj;
    });
    return response;
  }

  async getOneUser() {
    const user = await User.findById({ _id: this.id });
    if (!user) return false;
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async getAndDelete() {
    const deleteUser = await User.findByIdAndDelete({ _id: this.id });
    return deleteUser;
  }

  async getAndUpdate() {
    const update = {
      firstName: this.firstName,
      lastName: this.lastName,
      type: this.type,
    };
    const user: IUser = (await User.findByIdAndUpdate(
      { _id: this.id },
      update,
      {
        new: true,
      }
    )) as IUser;
    //return user;
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type
    };
  }
}

export default Users;
