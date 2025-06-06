import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { Manager } from '../../models/manager.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =  `${environment.apiUrl}/auth`;
   res:any;
  constructor(private http: HttpClient, private router: Router) {}
 


  register(manager: Manager): Observable<any> {
    return this.http.post<{ success: boolean, data: any, error: {message : string} }>(`${this.apiUrl}/register`, manager)
      .pipe(
        map(response => {
          if (response.success) {
            console.log(response)
            return response.data;
          } else {
            this.res=response;
            console.log(this.res.error);
            // If the response indicates failure, throw an error with the message from the API
            return throwError(() => new Error(response.error.message));
          }
          
        }),
     //  console.log('gg');
        catchError(this.handleError )
      );
  }

   // New login method
   login(email: string, password: string): Observable<any> {
    return this.http.post<{ success: boolean; data: any; error: { message: string } }>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response.success) {
            return response.data; // Return user data or token
          } else {
            return throwError(() => new Error(response.error.message));
          }
        }),
        catchError(this.handleError)
      );
  }

  // Store Token in Local Storage
  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Get Token
  getToken() {
    return localStorage.getItem('authToken');
  }

  // Check if User is Logged In
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }  else {
      // Extract the error message from the response if available
      errorMessage = error.error.error?.message || "Server Down" ;
    }

     // Use throwError with a factory function
     return throwError(() => new Error(errorMessage));

  }

  forgotPassword(data: { email: string }): Observable<any> {
    const frontendUrl = window.location.origin; // Gets "http://localhost:4200" or deployed URL
    return this.http.post(`${this.apiUrl}/forgot-password`, {...data,frontendUrl});
  }

  resetPassword(token: string, data: { newPassword: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, ...data });
  }

  sendOTP(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { email });
  }

  // Verify OTP
  verifyOTP(email: string, otp: string): Observable<any> {
     return this.http.post<{ success: boolean; data: any; error: { message: string } }>(`${this.apiUrl}/verify-otp`, { email, otp })
      .pipe(
        map(response => {
          if (response.success) {
            return response.data; // Return user data or token
          } else {
            return throwError(() => new Error(response.error.message));
          }
        }),
        catchError(this.handleError)
      );
   
  }
  
}
