import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Import Observable, throwError, of
import { catchError } from 'rxjs/operators'; // Import catchError
import { Skill } from '../models/skill.model'; // Import the Skill model

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private apiUrl = '/api/skills'; // Define API URL

  constructor(private http: HttpClient) { }

  // Method to get skills from the API
  getSkills(): Observable<Skill[]> { // Return type Observable<Skill[]>
    return this.http.get<Skill[]>(this.apiUrl)
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
