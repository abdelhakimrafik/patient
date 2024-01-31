export interface GenericResponse {
  status: string;
  message: string;
}

export interface ICredentials {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface IPatient {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  cardId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPage<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPage: number;
  data: T[];
}

export interface IPageFilter {
  page: number;
  pageSize: number;
  keyword?: string;
}
