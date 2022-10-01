import HttpClient from './utils/HttpClient';

class ContactsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts<T>(orderBy = 'asc'): Promise<T> {
    return this.httpClient.get<T>(`/contacts?orderBy=${orderBy}`);
  }

  createContact<D, R>(formData: D): Promise<unknown> {
    return this.httpClient.post<D, R>('/contacts', {
      headers: {
        Authorization: 'meuToken',
      },
      body: formData,
    });
  }
}

export default new ContactsService();
