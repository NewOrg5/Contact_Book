import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array: any[], query: any){
    if (query == undefined || query == "") {
      return array;
  }
  else {
      return array.filter(data => {
          if (data["name"].trim().toLowerCase().includes(query.toLowerCase())) {
              return true;
          }
          else {
              return false;
          }
      })
  }
  }

}
