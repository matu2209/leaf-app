import { Component, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var bootstrap: any; 

@Component({
  selector: 'app-foro-page',
  templateUrl: './foro-page.component.html',
  styleUrl: './foro-page.component.scss'
})
export class ForoPageComponent implements AfterViewInit {

  ngAfterViewInit() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  questions = [
    {
      id: 1,
      username: 'plantaLover101',
      category: 'question',
      question: '¿Cómo cuidar una Monstera deliciosa?',
      answers: [
        { id: 201, username: 'verdeFeliz', answer: 'La monstera prefiere luz indirecta y riego moderado.' },
        { id: 202, username: 'jardineroPro', answer: 'Evita el exceso de agua para prevenir raíces podridas.' },
      ],
    },
    {
      id: 2,
      username: 'sucuFan2023',
      category: 'question',
      question: '¿Cuál es la mejor forma de propagar suculentas?',
      answers: [
        { id: 203, username: 'verdeFeliz', answer: 'Se pueden propagar por hojas o esquejes.' },
      ],
    },
    {
      id: 3,
      username: 'dataFixer2023',
      category: 'bug',
      question: 'La descripción de la planta Aloe vera está incompleta. ¿Podrían corregirla?',
      answers: [
        { id: 204, username: 'adminBot', answer: 'Gracias por reportarlo. Revisaremos la información lo antes posible.' },
      ],
    },
    {
      id: 4,
      username: 'plantGeek',
      category: 'question',
      question: '¿Es seguro tener una Dieffenbachia en casa con mascotas?',
      answers: [
        { id: 205, username: 'greenVet', answer: 'No, es tóxica para mascotas. Mejor mantenerla fuera de su alcance.' },
      ],
    },
    {
      id: 5,
      username: 'errorHunter',
      category: 'bug',
      question: 'La imagen de la planta Ficus elastica no carga correctamente.',
      answers: [
        { id: 206, username: 'adminBot', answer: 'Gracias por el aviso. Estamos solucionando este problema.' },
      ],
    },
    {
      id: 6,
      username: 'natureLover22',
      category: 'question',
      question: '¿Qué tipo de luz necesita un Pothos dorado?',
      answers: [
        { id: 207, username: 'verdeFeliz', answer: 'Prefiere luz indirecta brillante, pero tolera condiciones más oscuras.' },
      ],
    },
    {
      id: 7,
      username: 'plantChecker',
      category: 'bug',
      question: 'La planta "Cactus de Navidad" aparece como "Cactus de Pascua" en la lista. ¿Es correcto?',
      answers: [
        { id: 208, username: 'botanicaPro', answer: 'Buen punto. Revisaremos el nombre botánico para verificarlo.' },
      ],
    },
    {
      id: 8,
      username: 'cactusLover88',
      category: 'question',
      question: '¿Cuántas veces al mes debería regar un cactus?',
      answers: [
        { id: 209, username: 'dryGardener', answer: 'En promedio, una vez al mes es suficiente. Deja secar el suelo entre riegos.' },
      ],
    },
    {
      id: 9,
      username: 'bugBuster',
      category: 'bug',
      question: 'El nombre científico de "Palma Areca" no coincide con la información oficial.',
      answers: [
        { id: 210, username: 'adminBot', answer: 'Estamos verificando la información con nuestras fuentes.' },
      ],
    },
    {
      id: 10,
      username: 'plantEnthusiast',
      category: 'question',
      question: '¿Qué plantas ayudan a purificar el aire en interiores?',
      answers: [
        { id: 211, username: 'verdeFeliz', answer: 'Algunas opciones son el Lirio de la Paz, el Ficus, y la Sansevieria.' },
      ],
    },
  ];





  
}