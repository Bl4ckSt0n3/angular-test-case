import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CreateUserComponent } from './create-user/create-user.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {


  openUserModal() {
    this.modalService.open(CreateUserComponent);
  }
  openCompanyModal() {
    this.modalService.open(AddCompanyComponent);
  }

  // add() {
  //   this.dbService.add('people', {
  //     name: 'Enes',
  //     lastname: 'Karatas',
  //     email: 'enesm.karatas@gmail.com'
  //   }).subscribe((key:any) => {
  //     console.log(key);
  //   });
  // }
  delete(id: number) {
    this.dbService.delete('people', id).subscribe((allPeople) => {
      console.log('all people:', allPeople);
    });
  }

  constructor(
    private dbService: NgxIndexedDBService,
    private modalService: NgbModal,
    ) { }

  allPeople: Array<any> = [];
  companies: Array<any> = [];
  ngOnInit(): void {
    // this.dbService.deleteDatabase().subscribe((deleted) => {
    //   console.log('Database deleted successfully: ', deleted);
    // });
    this.dbService.getAll('people').subscribe((people: any) => {
      console.log(people);
      this.allPeople = people;
    });
    this.dbService.getAll('companies').subscribe((company: any) => {
      console.log(company);
      this.companies = company;
    });
    // this.add();

  }

}
