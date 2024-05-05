export interface IUser {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  website: string;
  subRows?: IUser[];
}
