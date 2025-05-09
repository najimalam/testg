import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Import Observable, throwError, of
import { catchError } from 'rxjs/operators'; // Import catchError
import { Project } from '../models/project.model'; // Import the Project model

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = '/api/projects'; // Define API URL

  constructor(private http: HttpClient) { }

  // Method to get projects from the API
  getProjects(): Observable<Project[]> { // Return type Observable<Project[]>
    return this.http.get<Project[]>(this.apiUrl)
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
