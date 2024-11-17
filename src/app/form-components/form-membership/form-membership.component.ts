import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../../servidorConJWT/cliente';
declare var bootstrap: any;
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
  loggedInUser? : Client

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
    
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      if (this.loggedInUser) {        
        this.cards = this.loggedInUser.creditCard;
  }
    });
    console.log(this.loggedInUser);
    
    // this.cards = [
    //   {
    //     cardholderName: 'Alice Johnson',
    //     cardNumber: '1234 5678 1234 5678',
    //     expirationDate: '12/25',
    //     cvv: '123',
    //     billingAddress: '123 Elm Street',
    //     country: 'us'
    //   },
    //   {
    //     cardholderName: 'Bob Smith',
    //     cardNumber: '2345 6789 2345 6789',
    //     expirationDate: '05/24',
    //     cvv: '456',
    //     billingAddress: '456 Oak Avenue',
    //     country: 'ca'
    //   },
    //   {
    //     cardholderName: 'Carlos Perez',
    //     cardNumber: '3456 7890 3456 7890',
    //     expirationDate: '08/26',
    //     cvv: '789',
    //     billingAddress: '789 Pine Road',
    //     country: 'br'
    //   },
    //   {
    //     cardholderName: 'Diana Lopez',
    //     cardNumber: '4567 8901 4567 8901',
    //     expirationDate: '11/23',
    //     cvv: '012',
    //     billingAddress: '101 Maple Boulevard',
    //     country: 'ar'
    //   }
    // ];
  }
  
  // loadCardDetails() {
  
  //   const selectedCard = this.selectedCardControl.value;
  //   if (selectedCard) {
  //     this.membershipForm.patchValue(selectedCard);
  //   }
  // }

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


    if (!this.loggedInUser) {
      alert('No user is logged in.');
      return;
    }

  
    this.loggedInUser.creditCard.push({
          name: this.membershipForm.value.cardholderName, 
          number: this.membershipForm.value.cardNumber, 
          date: this.membershipForm.value.expirationDate, 
          cvv: this.membershipForm.value.cvv, 
          address: this.membershipForm.value.billingAddress, 
          country: this.membershipForm.value.country});
    this.loggedInUser.member = true;      
      this.authService.updateUser(this.loggedInUser)
      .subscribe(
        response => {
          console.log("Se agrego correctamente la tarjeta");
          alert('Se agrego correctamente la tarjeta');
          this.membershipForm.reset();
          const modalElement = document.getElementById('MembershipModal');
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance.hide();
        },
        error => {
          console.error("Error al cargar la tarjeta:", error);
        }
      );
  }
}