import { Component, OnInit } from '@angular/core';
import { SkillService } from '../../services/skill.service'; // Import SkillService
import { Skill } from '../../models/skill.model'; // Import the Skill model

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit { // Implement OnInit

  skills: Skill[] = []; // Use Skill[] type

  // Inject SkillService
  constructor(private skillService: SkillService) { }

  ngOnInit(): void {
    // Call service method in ngOnInit
    this.skillService.getSkills().subscribe({
      next: (data: Skill[]) => { // Use Skill[] type for data
        console.log('Skills fetched:', data); // Log fetched data
        this.skills = data;
      },
      error: (err) => {
        console.error('Error fetching skills:', err);
        // Optionally, set an error message property to display in the template
      }
    });
  }

}
