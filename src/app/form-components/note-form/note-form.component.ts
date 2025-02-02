import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastNotificationService } from '../../services/toast-service/toast-notification.service';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.scss'
})
export class NoteFormComponent {

  noteForm!: FormGroup;
  @Input() userNote: string = "";
  @Output() updateNote = new EventEmitter<string>();

  constructor(private toastNotificationService: ToastNotificationService){}

  ngOnInit(){
    this.noteForm = new FormGroup({
      note: new FormControl(this.userNote, [Validators.maxLength(200)])
    });

  }
  
  noteSubmit(){
    const newNote: string = this.noteForm.value.note;
    //console.log(newNote);
    this.updateNote.emit(newNote);
  }

}
