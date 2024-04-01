import ICreateContactRequest from '../HTTP/requests/IContactRequest';
import IResponseContactRequest from '../HTTP/responses/IContactResponse';
import ContactMapper, { DomainContactResponse } from './mappers/ContactMapper';
import HttpClient from './utils/HttpClient';

class ContactsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_BASE_URL || 'http://localhost:3001');
  }

  async listContacts(orderBy = 'asc'): Promise<DomainContactResponse[]> {
    const contacts = await this.httpClient.get<IResponseContactRequest[]>(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  createContact<R>(contact: ICreateContactRequest): Promise<unknown> {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.post<R>('/contacts', {
      body,
    });
  }

  updateContact<R>(id: string, contact: ICreateContactRequest): Promise<R> {
    const body = ContactMapper.toPersistence(contact);

    return this.httpClient.put<R>(`/contacts/${id}`, {
      body,
    });
  }

  async getContactById(id: string): Promise<DomainContactResponse> {
    const contact = await this.httpClient.get<IResponseContactRequest>(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  deleteContact<R>(id: string): Promise<R> {
    return this.httpClient.delete<R>(`/contacts/${id}`);
  }
}

export default new ContactsService();
