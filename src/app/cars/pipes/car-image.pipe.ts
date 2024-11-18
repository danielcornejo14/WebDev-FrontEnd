import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carImage',
  standalone: true
})

export class CarImagePipe implements PipeTransform {

  transform(): string {
    return 'public/no-image.png';
  }

}
