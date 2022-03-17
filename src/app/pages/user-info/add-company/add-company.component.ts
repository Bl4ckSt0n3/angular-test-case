import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  submitted: boolean = false;

  addCompanyForm = new FormGroup({
    companyName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })

  get f() {
    return this.addCompanyForm.controls;
  }
  confirm() {
    this.submitted = true;
    if (this.addCompanyForm.invalid) {
      return;
    }
    this.dbService.add('companies', {
      companyName: this.addCompanyForm.get("companyName")?.value,
      address: this.addCompanyForm.get("address")?.value,
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
