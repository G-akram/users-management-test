export interface UserName {
  title: string;
  first: string;
  last: string;
}

export interface UserPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface UserLocation {
  street: { number: number; name: string };
  city: string;
  state: string;
  country: string;
  postcode: string | number;
}

export interface UserLogin {
  uuid: string;
  username: string;
}

export interface UserDob {
  date: string;
  age: number;
}

export interface User {
  login: UserLogin;
  name: UserName;
  email: string;
  picture: UserPicture;
  location: UserLocation;
  phone: string;
  dob: UserDob;
  nat: string;
}

export interface ApiInfo {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface UsersResponse {
  results: User[];
  info: ApiInfo;
}

/** Pagination parameters passed to the API and hooks */
export interface PaginationParams {
  page: number;
  pageSize: number;
}
