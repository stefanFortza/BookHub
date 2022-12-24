export interface IUser {
  email: string;
  displayName: string;
}

export interface UserModel extends IUser {
  id: string;
}
