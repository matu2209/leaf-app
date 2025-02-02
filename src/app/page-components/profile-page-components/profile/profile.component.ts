import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication-service/authentication.service';
import { Client } from '../../../../../servidorConJWT/cliente';
import { CustomValidators } from '../../../customValidators/custom-Validators';
import { DistributionsService } from '../../../services/distribution-service/distributions.service';
import { ToastNotificationService } from '../../../services/toast-service/toast-notification.service';
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

  constructor(private authService: AuthenticationService, private DistributionsService: DistributionsService, private toastNotificationService: ToastNotificationService) {
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
          username: new FormControl({ value: this.loggedInUser?.username, disabled: true }, 
            [Validators.maxLength(20), Validators.required]),
          email: new FormControl({ value: this.loggedInUser?.email, disabled: false }, 
            [Validators.email, Validators.required]),
          firstName: new FormControl({ value: this.loggedInUser?.firstName, disabled: false }, 
            [Validators.maxLength(20), Validators.required]),
          lastName: new FormControl({ value: this.loggedInUser?.lastName, disabled: false }, 
            [Validators.maxLength(20), Validators.required]),
          birthDate: new FormControl({ value: this.loggedInUser?.birthDate, disabled: false }),
          country: new FormControl({ value: this.loggedInUser?.country, disabled: false }, 
            [Validators.required, Validators.required])
        });
      }
    });

    this.DistributionsService.getDistribution()
    .subscribe((data: string[]) => {
      this.distributions = data;
    });

  }

  togglePasswordChange(): void {
    this.isPasswordChangeVisible = !this.isPasswordChangeVisible;
  }

  submitChange(field: keyof Client): void {
    if (this.profileForm.get(field)?.invalid) {
      // alert(`Por favor, introduce un valor válido en ${field}.`);
      this.toastNotificationService.showToast(`Please enter a valid value for ${field}.`);
      return;
    }
    if (this.loggedInUser && this.profileForm.get(field)) {
      (this.loggedInUser as any)[field] = this.profileForm.get(field)?.value;
      this.authService.updateUser(this.loggedInUser).subscribe(
        response => {
          //console.log(`${field} actualizado correctamente.`);
          this.toastNotificationService.showToast("Profile updated successfully!");
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
      this.toastNotificationService.showToast(`Please enter a valid password.`);
      return;
    }

    const newPassword = this.passwordForm.get('password')?.value;
    if (this.loggedInUser) {
      this.loggedInUser.password = newPassword;

      this.authService.updateUser(this.loggedInUser).subscribe(
        response => {
          //console.log('Contraseña actualizada correctamente.');
          this.toastNotificationService.showToast("Password updated successfully!");
          this.isPasswordChangeVisible = false; // Ocultar el formulario después de guardar
          this.passwordForm.reset();
        },
        error => {
          console.error('Error al actualizar la contraseña:', error);
          alert('Error al actualizar la contraseña.');
        }
      );
    }
  }

}