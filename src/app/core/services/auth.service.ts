import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  public login$: Observable<boolean> = this.loginSubject.asObservable();

  constructor(private router: Router, private tokenService: TokenService) {}

  login(username: string, password: string): Observable<string> {
    // Authentication logic here
    let mockToken = 'abc123'; // Mock token for demonstration
    this.tokenService.saveToken(mockToken);
    this.loginSubject.next(true);
    this.router.navigate(['/dashboard']);
    return new Observable((observer) => {
      observer.next(mockToken);
      observer.complete();
    });
  }

  logout(): void {
    this.tokenService.removeToken();
    this.loginSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    console.log(this.tokenService);
    return !!this.tokenService?.getToken();
  }
}
