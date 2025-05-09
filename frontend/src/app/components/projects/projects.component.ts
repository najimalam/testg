import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service'; // Import ProjectService
import { Project } from '../../models/project.model'; // Import the Project model

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit { // Implement OnInit

  projects: Project[] = []; // Use Project[] type

  // Inject ProjectService
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    // Call service method in ngOnInit
    this.projectService.getProjects().subscribe({
      next: (data: Project[]) => { // Use Project[] type for data
        console.log('Projects fetched:', data); // Log fetched data
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
        // Optionally, set an error message property to display in the template
      }
    });
  }

}
