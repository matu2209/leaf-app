import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Client } from '../../../../servidorConJWT/cliente';
import { CustomValidators } from '../../customValidators/passwordValidator';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup= new FormGroup({});
  loggedInUser? : Client
  
  constructor(private authService: AuthenticationService){}

  ngOnInit(): void {
    
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);
      if(this.loggedInUser){
        this.profileForm = new FormGroup({
          username: new FormControl({ value: this.loggedInUser?.username, disabled: true}),  
          email: new FormControl({value: this.loggedInUser?.email,disabled: false}),
          firstName: new FormControl({value: this.loggedInUser?.firstName,disabled: false}),
          lastName: new FormControl({value: this.loggedInUser?.lastName,disabled: false}),
          birthDate: new FormControl({value: this.loggedInUser?.birthDate,disabled: false}),
          country: new FormControl({value: this.loggedInUser?.country,disabled: false})
        });}
    });
    
  }
  submitChange(field: keyof Client){
    if (this.profileForm.get(field)?.invalid) {
      alert(`Por favor, introduce un valor válido en ${field}.`);
      return;
    }
    if(this.loggedInUser && this.profileForm.get(field)){
      
      (this.loggedInUser as any)[field] = this.profileForm.get(field)?.value;

      this.authService.updateUser(this.loggedInUser)
        .subscribe(
          response => {
            console.log(`${field} actualizado correctamente.`);
            alert(`${field} actualizado correctamente.`);
          },
          error => {
            console.error(`Error al actualizar ${field}:`, error);
            alert(`Error al actualizar ${field}.`);
          }
        );}
    
}
}