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

export interface IInsurance {
  name: string;
}

export interface IPatient<InsuranceType = string> {
  id: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  cardId: string;
  insurance: InsuranceType;
  phone: string;
  address: string;
  additionalAddress: string;
}

export interface IDocumentApiResponse {
  patient: IPatient<IInsurance>;
  createdAt: string;
  updatedAt: string;
}

export interface IDocument
  extends IPatient,
    Omit<IDocumentApiResponse, 'patient'> {}

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
