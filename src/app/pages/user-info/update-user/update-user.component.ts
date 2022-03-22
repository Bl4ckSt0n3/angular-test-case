import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  submitted: boolean = false;

  updateAccountForm = new FormGroup({
    Id: new FormControl('', [Validators.required]),
    Name: new FormControl('', [Validators.required]),
    Lastname: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
  });

  get f() {
    return this.updateAccountForm.controls;
  }
  confirm() {
    this.submitted = true;
    if (this.updateAccountForm.invalid) {
      return;
    }
    this.dbService.update('people', {
      id: this.updateAccountForm.get("Id")?.value,
      name: this.updateAccountForm.get("Name")?.value,
      lastname: this.updateAccountForm.get("Lastname")?.value,
      email: this.updateAccountForm.get("Email")?.value
      }).subscribe((storeData:any) => {
        console.log('storeData: ', storeData);
    });
    // alert(this.deleteAccountForm.get("name")?.value + "  is deleted !");
    this.activeModal.close('Cross click');
    window.location.reload();
  }
  constructor(
    public activeModal: NgbActiveModal,
    private dbService: NgxIndexedDBService,
    private messageService: MessageService
  ) { 
    const data = this.messageService.getData();
    this.updateAccountForm.reset(data);
    console.log(data);
   }

  ngOnInit(): void {
  }

}
