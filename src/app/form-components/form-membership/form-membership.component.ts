import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../../../servidorConJWT/cliente';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service'; 
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

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private http: HttpClient,private toast: ToastNotificationService){
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
    //console.log(this.loggedInUser);
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
          //console.log("Se agrego correctamente la tarjeta");
          this.toast.showToast("Membership aquired successfully! Your membership is now active. Thanks!");  
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