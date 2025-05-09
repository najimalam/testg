import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Import Observable, throwError, of
import { catchError } from 'rxjs/operators'; // Import catchError

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = '/api/contact'; // Define API URL

  constructor(private http: HttpClient) { }

  // Method to send contact form data to the API
  sendContactForm(data: any): Observable<any> { // Return type Observable<any> for potential response
    return this.http.post<any>(this.apiUrl, data)
      .pipe(
        catchError(this.handleError) // Add error handling
      );
  }

  // Basic error handling function
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Use throwError factory
  }
}
