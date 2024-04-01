/* eslint-disable semi */
export default interface ICreateContactRequest {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

export type IUpdateContactRequest = ICreateContactRequest
