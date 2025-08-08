// lib/services/apiService.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = '/api';
  }

  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    route: string,
    data?: any,
    config: RequestInit = {}
  ): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    const isFormData = data instanceof FormData;
    const headers: HeadersInit = {
      ...(!isFormData && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(config.headers || {}),
    };

    const options: RequestInit = {
      method,
      headers,
      ...config,
      ...(data && { body: isFormData ? data : JSON.stringify(data) }),
      cache: 'no-store',
    };

    const url = `${this.baseURL}${route}`;

    try {
      const res = await fetch(url, options);

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        this.handleError(errData);
        throw new Error(errData.message || 'Erro inesperado');
      }

      return res.json();
    } catch (err) {
      this.handleError(err);
      throw err;
    }
  }

  get = async <T>(route: string, params: Record<string, any> = {}): Promise<T> => {
    const query = new URLSearchParams(params).toString();
    const fullRoute = query ? `${route}?${query}` : route;
    return this.request<T>('GET', fullRoute);
  };

  post = async <T>(route: string, data: any, config: RequestInit = {}): Promise<T> => {
    return this.request<T>('POST', route, data, config);
  };

  put = async <T>(route: string, data: any, config: RequestInit = {}): Promise<T> => {
    return this.request<T>('PUT', route, data, config);
  };

  delete = async <T>(route: string): Promise<T> => {
    return this.request<T>('DELETE', route);
  };

  private handleError = (error: any) => {
    console.error('Erro na API:', error);
    if (typeof window !== 'undefined') {
      alert(error?.message || 'Erro inesperado. Tente novamente mais tarde.');
    }
  };
}

const api = new ApiService();
export default api;
