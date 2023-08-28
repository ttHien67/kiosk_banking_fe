import { Component, OnInit } from '@angular/core';

import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css']
})
export class OcrComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  extractedText: string = '';

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.extractedText = ''; // Clear previous extracted text

    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        if(reader.result) {
          const imageBase64 = reader.result.toString().split(',')[1];

          const { data: { text } } = await Tesseract.recognize(
            'data:image/jpeg;base64,' + imageBase64,
            'eng' // Language code (e.g., 'eng' for English)
          );
  
          this.extractedText = text;
        }
      };
      reader.readAsDataURL(file);
    }
  }

}
