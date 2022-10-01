import HttpClient from './utils/HttpClient';

class CategoriesService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listCategories<T>(): Promise<T> {
    return this.httpClient.get<T>('/categories');
  }
}

export default new CategoriesService();
