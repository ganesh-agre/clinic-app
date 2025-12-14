import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Show loader before request
    console.log('Request started:', request.url);

    return next.handle(request).pipe(
      finalize(() => {
        // Hide loader after request completes
        console.log('Request completed:', request.url);
      })
    );
  }
}
