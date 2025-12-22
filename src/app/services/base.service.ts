import {inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export abstract class BaseService {
  protected readonly http = inject(HttpClient);

  protected get<T>(url: string, actions?: string[] | number[]) {
    const parsedUrl = actions ? this.parseUrl(url, actions) : url;

    return this.http.get<T>(parsedUrl);
  }

  protected post<T>(url: string, body: any, actions?: string[] | number[]) {
    let parsedUrl = actions ? this.parseUrl(url, actions) : url;

    return this.http.post<T>(parsedUrl, body);
  }

  protected put<T>(url: string, body: any, actions?: string[] | number[]) {
    let parsedUrl = actions ? this.parseUrl(url, actions) : url;

    return this.http.put<T>(parsedUrl, body);
  }

  private parseUrl(url: string, actions: string[] | number[]): string {
    let parsedUrl = url;

    for (const action of actions)
      parsedUrl += ('/' + action);

    return parsedUrl;
  }

}

