import HttpClient from './utils/HttpClient';

class ContactsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_DNS as string);
  }

  listContacts<T>(orderBy = 'asc'): Promise<T> {
    return this.httpClient.get<T>(`/contacts?orderBy=${orderBy}`);
  }

  createContact<D, R>(formData: D): Promise<unknown> {
    return this.httpClient.post<D, R>('/contacts', {
      body: formData,
    });
  }

  updateContact<D, R>(id: string, formData: D): Promise<R> {
    return this.httpClient.put<D, R>(`/contacts/${id}`, {
      body: formData,
    });
  }

  getContactById<T>(id: string): Promise<T> {
    return this.httpClient.get<T>(`/contacts/${id}`);
  }

  deleteContact<R>(id: string): Promise<R> {
    return this.httpClient.delete<R>(`/contacts/${id}`);
  }
}

export default new ContactsService();
