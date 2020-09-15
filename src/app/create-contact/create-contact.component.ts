import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CountryService } from '../country.service';
import { DeleteContactComponent } from './delete-contact/delete-contact.component';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  createContact = false;
  contact_data = []
  read_contact_data = false
  updateData = false
  readContactData = []
  lowValue=0
  highValue=5
  index: number
  searchValue:string=''
  TodayDate:Date
  contact_details_header = ['name', 'email', 'dob', 'update', 'delete']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  create_contact: FormGroup
  constructor(private fb: FormBuilder,public modal:MatDialog,public service:CountryService) {
   
  }

  ngOnInit(): void {
    this.TodayDate=new Date()
    this.createContact=true
    this.create_contact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      dob: ['', Validators.required],
      // city: ['', Validators.required],
      // state: ['', Validators.required]
    })

    // this.service.getCountryDetails().subscribe(data=>
    //   {
    //     console.log(data)
    //   })

  }


  public hasError = (controlName: string, errorName: string) => {
    return this.create_contact.controls[controlName].hasError(errorName);
  }
  get name() {
    return this.create_contact.get('name');
  }
  get email() {
    return this.create_contact.get('email');
  }
  get dob() {
    return this.create_contact.get('dob');
  }


  goBack(){
    this.updateData=false;
    this.createContact=true
    this.read_contact_data=false
  }

  create() {
    this.contact_data.push(this.create_contact.value)
    localStorage.setItem("contact", JSON.stringify(this.contact_data))
    this.create_contact.reset()
  }

  read_data() {
    this.createContact = false
    this.read_contact_data = true
    this.readContactData = JSON.parse(localStorage.getItem('contact'))
  
console.log(this.readContactData)
  }

  update_data(i) {
    this.updateData = true
    this.createContact = true
    this.read_contact_data=false
    this.create_contact.patchValue(this.readContactData[i])
    this.index = i
  }

  update() {
    
    this.readContactData[this.index]=this.create_contact.value
    localStorage.setItem('contact',JSON.stringify(this.readContactData))
    this.create_contact.reset()
    console.log(this.readContactData)
    // this.read_data()
  }

  delete_data(i) {

    const dialogRef=this.modal.open(DeleteContactComponent,
      {
        width:'500px',
        position:{top:'100px'},
        disableClose:true,
        data:{
          index:i,
          data:this.readContactData
        }
      })
      dialogRef.afterClosed().subscribe(data=>
        {
          if(data["data"]==true)
          {
             this.readContactData.splice(i,1)
             localStorage.setItem('contact',JSON.stringify(this.readContactData))
             this.read_data()
          }
        })
  }

}
