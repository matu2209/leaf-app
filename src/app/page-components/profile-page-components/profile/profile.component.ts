import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { Client } from '../../../../../servidorConJWT/cliente';
import { CustomValidators } from '../../../customValidators/passwordValidator';
import { DistributionsService } from '../../../services/distribution-service/distributions.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  passwordForm: FormGroup;
  loggedInUser?: Client;
  isPasswordChangeVisible = false; 

  distributions: String [] = [];

  constructor(private authService: AuthenticationService, private DistributionsService: DistributionsService) {
    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation: new FormControl('', [Validators.required])
    }, [CustomValidators.passwordMatch]);
  }

  ngOnInit(): void {

    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      if (this.loggedInUser) {
        this.profileForm = new FormGroup({
          username: new FormControl({ value: this.loggedInUser?.username, disabled: true }),
          email: new FormControl({ value: this.loggedInUser?.email, disabled: false }),
          firstName: new FormControl({ value: this.loggedInUser?.firstName, disabled: false }),
          lastName: new FormControl({ value: this.loggedInUser?.lastName, disabled: false }),
          birthDate: new FormControl({ value: this.loggedInUser?.birthDate, disabled: false }),
          country: new FormControl({ value: this.loggedInUser?.country, disabled: false })
        });
      }
    });

    this.DistributionsService.getDistribution()
    .subscribe((data: string[]) => {
      this.distributions = data;
      console.log(this.distributions);
    });

  }

  togglePasswordChange(): void {
    this.isPasswordChangeVisible = !this.isPasswordChangeVisible;
  }

  submitChange(field: keyof Client): void {
    if (this.profileForm.get(field)?.invalid) {
      alert(`Por favor, introduce un valor válido en ${field}.`);
      return;
    }
    if (this.loggedInUser && this.profileForm.get(field)) {
      (this.loggedInUser as any)[field] = this.profileForm.get(field)?.value;
      this.authService.updateUser(this.loggedInUser).subscribe(
        response => {
          console.log(`${field} actualizado correctamente.`);
          alert(`${field} actualizado correctamente.`);
        },
        error => {
          console.error(`Error al actualizar ${field}:`, error);
          alert(`Error al actualizar ${field}.`);
        }
      );
    }
  }

  submitPasswordChange(): void {
    if (this.passwordForm.invalid) {
      alert('Por favor, introduce contraseñas válidas.');
      return;
    }

    const newPassword = this.passwordForm.get('password')?.value;
    if (this.loggedInUser) {
      // Actualizamos la contraseña directamente en el objeto loggedInUser
      this.loggedInUser.password = newPassword;

      // Llamamos a updateUser para actualizar el usuario con la nueva contraseña
      this.authService.updateUser(this.loggedInUser).subscribe(
        response => {
          console.log('Contraseña actualizada correctamente.');
          alert('Contraseña actualizada correctamente.');
          this.isPasswordChangeVisible = false; // Ocultar el formulario después de guardar
        },
        error => {
          console.error('Error al actualizar la contraseña:', error);
          alert('Error al actualizar la contraseña.');
        }
      );
    }
  }
  
}