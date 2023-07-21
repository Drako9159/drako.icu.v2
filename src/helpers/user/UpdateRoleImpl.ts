import { User } from "../../models/User";
import { IUser } from "../../interfaces/IUser";

class UpdateRoleImpl {
  private id: string | undefined;
  private role: string | undefined;

  constructor(
    id?: string,
    role?: string,
  ) {
    this.id = id;
    this.role = role;
    
  }

  // static async getAllUsers() {
  //   const users = await User.find({});
  //   const response = users.map((e) => {
  //     const obj = {
  //       id: e._id,
  //       firstName: e.firstName,
  //       lastName: e.lastName,
  //       email: e.email,
  //       confirmed: e.confirmed,
  //       role: e.role,
  //       blocked: e.blocked,
  //       createdAt: e.createdAt,
  //       updatedAt: e.updatedAt,
  //     };
  //     return obj;
  //   });
  //   return response;
  // }

  async getOneUser() {
    const user = await User.findById({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      resetPasswordToken: user.resetPasswordToken,
      confirmationToken: user.confirmationToken,
      confirmed: user.confirmed,
      role: user.role,
      blocked: user.blocked,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async getAndDelete() {
    const user = await User.findById({ _id: this.id });
    if (!user) return "USER_NOT_FOUND";
    const userDeleted = await User.findByIdAndDelete({ _id: this.id });
    return userDeleted;
  }

  async getAndUpdate() {
    const update = {
      firstName: this.firstName,
      lastName: this.lastName,
      // type: this.type,
    };
    const user: IUser = (await User.findByIdAndUpdate(
      { _id: this.id },
      update,
      {
        new: true,
      }
    )) as IUser;
    if (!user) return "USER_NOT_FOUND";
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // role: user.role,
    };
  }
}

export default UpdateRoleImpl;
