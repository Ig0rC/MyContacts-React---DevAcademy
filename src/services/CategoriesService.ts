import HttpClient from './utils/HttpClient';

class CategoriesService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(process.env.REACT_APP_DNS as string);
  }

  listCategories<T>(): Promise<T> {
    return this.httpClient.get<T>('/categories');
  }
}

export default new CategoriesService();
