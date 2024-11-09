import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-membership',
  templateUrl: './form-membership.component.html',
  styleUrls: ['./form-membership.component.scss']
})
export class FormMembershipComponent implements OnInit {
  membershipForm: FormGroup;
  cards: any[] = [];
  selectedCardControl = new FormControl(null);
  showForm: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private http: HttpClient) {
    this.membershipForm = this.fb.group({
      cardholderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      billingAddress: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    const loggedInUser = this.authService.getLoggedUser();
    if (loggedInUser) {
      const url = ``;//ruta jsonsv
      this.http.get<any>(url).subscribe(
        user => {
          this.cards = user.cards || [];
        },
        error => console.error('Error loading cards', error)
      );
    }
  }
//   this.cards = [
//     {
//       cardholderName: 'Alice Johnson',
//       cardNumber: '1234 5678 1234 5678',
//       expirationDate: '12/25',
//       cvv: '123',
//       billingAddress: '123 Elm Street',
//       country: 'us'
//     },
//     {
//       cardholderName: 'Bob Smith',
//       cardNumber: '2345 6789 2345 6789',
//       expirationDate: '05/24',
//       cvv: '456',
//       billingAddress: '456 Oak Avenue',
//       country: 'ca'
//     },
//     {
//       cardholderName: 'Carlos Perez',
//       cardNumber: '3456 7890 3456 7890',
//       expirationDate: '08/26',
//       cvv: '789',
//       billingAddress: '789 Pine Road',
//       country: 'br'
//     },
//     {
//       cardholderName: 'Diana Lopez',
//       cardNumber: '4567 8901 4567 8901',
//       expirationDate: '11/23',
//       cvv: '012',
//       billingAddress: '101 Maple Boulevard',
//       country: 'ar'
//     }
//   ];
// }

  loadCardDetails() {
    const selectedCard = this.selectedCardControl.value;
    if (selectedCard) {
      this.membershipForm.patchValue(selectedCard);
      this.showForm = true;
    } else {
      this.showForm = false;
    }
  }

  addNewCard() {
    this.membershipForm.reset();
    this.showForm = true;
    this.selectedCardControl.setValue(null);
  }

  submitMembership() {
    if (this.membershipForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const loggedInUser = this.authService.getLoggedUser();
    if (!loggedInUser) {
      alert('No user is logged in.');
      return;
    }

    const cardDetails = this.membershipForm.value;
    const updatedUser = {
      ...loggedInUser,
      cards: [...this.cards, cardDetails],
      isMember: true
    };

    const url = `http://localhost:3000/users/${loggedInUser.id}`;

    this.http.put(url, updatedUser).subscribe(
      response => {
        console.log('Membership updated successfully', response);
        alert('Membership updated successfully');
        this.membershipForm.reset();
        this.showForm = false;
      },
      error => {
        console.error('Error updating membership', error);
        alert('Error updating membership');
      }
    );
  }
}
