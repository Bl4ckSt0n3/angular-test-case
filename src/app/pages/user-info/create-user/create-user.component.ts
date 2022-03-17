import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  submitted: boolean = false;

  createAccountForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  get f() {
    return this.createAccountForm.controls;
  }
  confirm() {
    this.submitted = true;
    if (this.createAccountForm.invalid) {
      return;
    }
    this.dbService.add('people', {
      name: this.createAccountForm.get("name")?.value,
      lastname: this.createAccountForm.get("lastname")?.value,
      email: this.createAccountForm.get("email")?.value
      }).subscribe((key:any) => {
        console.log(key);
    });
    // alert(this.deleteAccountForm.get("name")?.value + "  is deleted !");
    this.activeModal.close('Cross click');
    window.location.reload();
  }
  constructor(
    public activeModal: NgbActiveModal,
    private dbService: NgxIndexedDBService
  ) { }

  ngOnInit(): void {
    
  }

}
