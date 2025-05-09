import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  constructor(private http: HttpClient) { }

  // Placeholder method to get experiences
  getExperiences(): Observable<any[]> {
    console.log('ExperienceService: getExperiences called');
    // return this.http.get<any[]>('/api/experiences');
    return of([]); // Return an empty array observable
  }
}
