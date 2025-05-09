import { Component, OnInit } from '@angular/core'; // Keep OnInit for consistency
import { ContactService } from '../../services/contact.service'; // Import ContactService

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // Inject ContactService
  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    // Can be left empty for now
  }

  // Method to handle form submission
  onSubmit(): void {
    console.log('Contact form submitted');
    // Placeholder data for now, replace with actual form data later
    const formData = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message.'
    };
    this.contactService.sendContactForm(formData).subscribe({
      next: (response) => {
        console.log('Contact form submission successful:', response);
        // Handle success (e.g., show success message, reset form)
      },
      error: (err) => {
        console.error('Error submitting contact form:', err);
        // Handle error (e.g., show error message)
      }
    });
  }

}
