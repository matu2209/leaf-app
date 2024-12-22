import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../../../servidorConJWT/post';
import { ForumService } from '../../../services/forumService/forum.service';

declare var bootstrap: any; 

@Component({
  selector: 'app-foro-page',
  templateUrl: './foro-page.component.html',
  styleUrl: './foro-page.component.scss'
})
export class ForoPageComponent implements AfterViewInit {

  foro: Post[] = [];

  constructor(private forumService: ForumService){}

  ngAfterViewInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit() {
    this.forumService.getForo(); // cargar foro

    this.forumService.foroSubject$.subscribe(questions => {
      this.foro = questions.reverse();
    });
  }




  
}