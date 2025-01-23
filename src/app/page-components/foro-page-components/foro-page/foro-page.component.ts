import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../../../servidorConJWT/post';
import { ForumService } from '../../../services/forumService/forum.service';
import { ToastNotificationService } from '../../../services/toast-service/toast-notification.service';


declare var bootstrap: any; 

@Component({
  selector: 'app-foro-page',
  templateUrl: './foro-page.component.html',
  styleUrl: './foro-page.component.scss'
})
export class ForoPageComponent implements AfterViewInit {

  foro: Post[] = [];
  categories: string[] = ['Announcement', 'Discussion', 'Research', 'Suggestion', 'Bug', 'Question']; // Lista de categorías
  filterForm!: FormGroup;

  constructor(private forumService: ForumService, private toast:ToastNotificationService){}
  
  ngAfterViewInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }
  

  ngOnInit() {
    this.forumService.getForo(); // cargar foro
    this.filterForm = new FormGroup({
      announcement: new FormControl(false),
      discussion: new FormControl(false),
      research: new FormControl(false),
      suggestion: new FormControl(false),
      bug: new FormControl(false),
      question: new FormControl(false)
    });
    this.forumService.foroSubject$.subscribe(questions => {
      this.foro = questions;
    });

    const backToTopButton = document.getElementById('backToTopButton');
    if (backToTopButton) {
      backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      });
    }
    
  }

  get isAnyCheckboxChecked() {
    return Object.values(this.filterForm.value).includes(true);
  }

  onSubmitFilter(){
    const selectedCategories = Object.keys(this.filterForm.value).filter(key => this.filterForm.value[key]);
    this.foro = this.forumService.getForoFilter(selectedCategories);
    if (this.foro.length == 0) {
      this.toast.showToast("No data found for these categories");
      this.filterForm.reset();
      this.forumService.foroSubject$.subscribe(questions => {
        this.foro = questions;
      });
    }
  }
    
  openCommentModal(id: number){
    this.forumService.currentPostId = id;
  }

  
}