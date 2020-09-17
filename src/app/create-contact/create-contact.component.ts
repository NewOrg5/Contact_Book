import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  lowValue = 0
  highValue = 5
  index: number
  searchValue: string = ''
  TodayDate: Date
  contact_details_header = ['sl#', 'name', 'email', 'dob', 'city', 'state', 'update', 'delete']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  create_contact: FormGroup
  constructor(private fb: FormBuilder, public modal: MatDialog) {

  }


  ngOnInit(): void {

    this.TodayDate = new Date()
    this.createContact = true
    this.create_contact = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      dob: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    })

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

  get city() {
    return this.create_contact.get('city');
  }

  get state() {
    return this.create_contact.get('state');
  }


  goBack() {
    this.updateData = false;
    this.createContact = true
    this.read_contact_data = false
  }

  create() {
    this.contact_data.push(this.create_contact.value)
    localStorage.setItem("contact", JSON.stringify(this.contact_data))
    this.create_contact.reset()
  }

  read_data() {
    this.createContact = false
    this.read_contact_data = true
    this.contact_data = JSON.parse(localStorage.getItem('contact'))

    // console.log(this.readContactData)
  }

  update_data(i) {
    this.updateData = true
    this.createContact = true
    this.read_contact_data = false
    this.create_contact.patchValue(this.contact_data[i])
    this.index = i
  }

  update() {
    this.updateData = false
    this.createContact = false
    this.read_contact_data = true
    this.contact_data[this.index] = this.create_contact.value
    localStorage.setItem('contact', JSON.stringify(this.contact_data))
    this.create_contact.reset()
    console.log(this.contact_data)
    // this.read_data()
  }

  delete_data(i) {

    const dialogRef = this.modal.open(DeleteContactComponent,
      {
        width: '500px',
        position: { top: '100px' },
        disableClose: true,
        data: {
          index: i,
          data: this.contact_data
        }
      })
    dialogRef.afterClosed().subscribe(data => {
      if (data["data"] == true) {
        this.contact_data.splice(i, 1)
        localStorage.setItem('contact', JSON.stringify(this.contact_data))
        this.read_data()
      }
    })
  }


  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}
