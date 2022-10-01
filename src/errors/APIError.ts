class APIError extends Error {
  public name: string;

  public response: Response;

  constructor(response: Response, body: { error: 'string' }) {
    super();

    this.name = 'APIError';
    this.response = response;
    this.message = body?.error || `${response.status} - ${response.statusText}`;
  }
}

export default APIError;
