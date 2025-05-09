import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient) { }

  // Placeholder method to get education entries
  getEducations(): Observable<any[]> {
    console.log('EducationService: getEducations called');
    // return this.http.get<any[]>('/api/education');
    return of([]); // Return an empty array observable
  }
}
