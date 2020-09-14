import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {

  createContact = true;
  contact_data = []
  read_contact_data = false
  updateData = false
  readContactData = []
  index: number
  contact_details_header = ['name', 'email', 'dob', 'update', 'delete']
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  create_contact: FormGroup
  constructor(private fb: FormBuilder) {
    this.create_contact = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      // city: ['', Validators.required],
      // state: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }


  create() {
    this.contact_data.push(this.create_contact.value)
    localStorage.setItem("contact", JSON.stringify(this.contact_data))
  }

  read_data() {
    this.createContact = false
    this.read_contact_data = true
    this.readContactData = JSON.parse(localStorage.getItem('contact'))
  

  }

  update_data(i) {
    this.updateData = true
    this.createContact = true
    this.create_contact.patchValue(this.readContactData[i])
    this.index = i
  }

  update() {
    this.readContactData[this.index]=this.create_contact.value
    
    this.create_contact.reset()
    console.log(this.readContactData)
  }

  delete_data(i) {
    console.log(i)
    this.readContactData.splice(i,1)
    console.log(this.readContactData)
  }

}
