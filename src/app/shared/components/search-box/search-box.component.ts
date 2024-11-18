import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter,Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';



@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  value: string|undefined;

  @Output()
  public onValue = new EventEmitter<string>();
  
  emitValue(value:string): void{
    //this.onValue.emit(value);
    console.log(value);
  }


}
