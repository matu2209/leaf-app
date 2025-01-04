import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor() { }
  generatePDF() {
    const element = document.getElementById('plant-info-content'); // ID del contenedor HTML que queremos convertir
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png'); // Convertir el HTML en imagen
        const pdf = new jsPDF('p', 'mm', 'a4'); // Crear un documento PDF con orientación vertical (p)
        const imgWidth = 190; // Ancho de la imagen en mm (ajusta según tu diseño)
        const pageHeight = 297; // Alto de una página A4 en mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajustar el alto proporcionalmente
        const position = 10; // Margen superior en mm

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        pdf.save('record.pdf'); // Descargar el PDF con este nombre
      });
    }
  }
}
