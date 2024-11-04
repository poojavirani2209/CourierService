export interface NewUser {
  email: string;
  password: string;
  senderName: string;
  senderAddress: string;
}

export interface UserDetails extends NewUser {
  id: string;
  isAdmin:boolean
}

export interface UserLoginDetails {
  email: string;
  password: string;
}
