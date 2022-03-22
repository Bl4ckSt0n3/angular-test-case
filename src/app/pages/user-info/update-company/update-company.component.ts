import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss']
})
export class UpdateCompanyComponent implements OnInit {

  submitted: boolean = false;

  updateCompanyForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })

  get f() {
    return this.updateCompanyForm.controls;
  }
  confirm() {
    this.submitted = true;
    if (this.updateCompanyForm.invalid) {
      return;
    }
    this.dbService.update('companies', {
      id: this.updateCompanyForm.get("id")?.value,
      companyName: this.updateCompanyForm.get("companyName")?.value,
      address: this.updateCompanyForm.get("address")?.value,
      }).subscribe((key:any) => {
        console.log(key);
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
    this.updateCompanyForm.reset(data);
    // console.log(data);
   }

  ngOnInit(): void {
  }

}
