import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrls: ['./delete-contact.component.css']
})
export class DeleteContactComponent implements OnInit {
  index:number;
  dat:[]
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogue: MatDialogRef<DeleteContactComponent>) {
    this.index=data.index
    this.dat=data.data
    // console.log(this.index)
    // console.log(this.dat)
    console.log(this.dat[this.index]["name"])
   }

  ngOnInit(): void {
  }
  

  closeModal(){
    this.dialogue.close({data:false});
  }


  deleteContact(){
    // this.dat.splice(this.index,1)
    // localStorage.setItem('contact',JSON.stringify(this.dat))
    this.dialogue.close({data:true})
  }

}
