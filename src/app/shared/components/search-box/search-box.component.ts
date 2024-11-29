import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {

  value: string|undefined;
  @Input() suggestions!: string[];
  @Output() onValue = new EventEmitter<string>();

  myControl = new FormControl('');
  
  emitValue(value:string): void{
    this.onValue.emit(value);
  }

}
