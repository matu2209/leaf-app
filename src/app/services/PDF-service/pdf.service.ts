import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PDFService {

  constructor() { }

generatePDF(fileName: string) {

   const firstSectionElements = document.querySelectorAll('.first-section');
  const secondSectionElements = document.querySelectorAll('.second-section');

  if (firstSectionElements.length === 0 || secondSectionElements.length === 0) return;

  const firstSectionClones = Array.from(firstSectionElements).map(element => 
    element.cloneNode(true) as HTMLElement
  );
  const secondSectionClones = Array.from(secondSectionElements).map(element => 
    element.cloneNode(true) as HTMLElement
  );

  firstSectionClones.forEach(clone => document.body.appendChild(clone));
  secondSectionClones.forEach(clone => document.body.appendChild(clone));

  this.removeUnwantedElements(firstSectionClones);
  this.removeUnwantedElements(secondSectionClones);

  this.expandCollapsableElements(firstSectionClones);
  this.expandCollapsableElements(secondSectionClones);

  setTimeout(() => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    this.generateSectionsPDF(firstSectionClones, pdf, 0,).then(() => {

      this.generateSectionsPDF(secondSectionClones, pdf, 1).then(() => {

        pdf.save(`${fileName}.pdf`);


        firstSectionClones.forEach(clone => clone.remove());
        secondSectionClones.forEach(clone => clone.remove());
      });
    });
  }, 500);
}

private generateSectionsPDF(elements: HTMLElement[], pdf: jsPDF, pageIndex: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    let yOffset = 0;
    const maxPageHeight = pdf.internal.pageSize.height - 10;
    const imgWidth = 220; 
    let processedCount = 0;  

    
    if (pageIndex > 0) {
      pdf.addPage(); 
    }

    elements.forEach((element, index) => {
     
      console.log('Capturando elemento: ', element);

      html2canvas(element as HTMLElement, { scale: 0.8, logging: true }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        if (yOffset > 0) {
          
          if (yOffset + imgHeight > maxPageHeight) {
            pdf.addPage();
            yOffset = 0; 
          }
        }

        
        pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
        yOffset += imgHeight;  
        processedCount++;
        if (processedCount === elements.length) {
          resolve(); 
        }
      }).catch(error => {
        console.error('Error al capturar el elemento: ', error);
        reject(error);
      });
    });
  });
}

private removeUnwantedElements(elements: HTMLElement[]) {
  const selectorsToRemove = ['.no-print'];

  elements.forEach((element) => {
    selectorsToRemove.forEach((selector) => {
      element.querySelectorAll(selector).forEach((el) => el.remove());
    });
  });
}

private expandCollapsableElements(elements: HTMLElement[]) {
  elements.forEach((element) => {
    const collapsibleElements = element.querySelectorAll('.collapse');
    collapsibleElements.forEach((el: any) => {
      el.classList.remove('collapse', 'collapsed');
    });
  });
}
}