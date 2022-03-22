import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MessageService } from 'src/app/services/message.service';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateCompanyComponent } from './update-company/update-company.component';
import { UpdateUserComponent } from './update-user/update-user.component';

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
  deleteUser(id: number) {
    this.dbService.delete('people', id).subscribe((allPeople) => {
      console.log('all people:', allPeople);
    });
    window.location.reload();
  }
  deleteCompany(id: number) {
    this.dbService.delete('companies', id).subscribe((allPeople) => {
      console.log('all companies:', allPeople);
    });
    window.location.reload();
  }

  updateUser(id: number, name: string, lastname: string, email: string) {
    const data = {
      Id: id,
      Name: name,
      Lastname: lastname,
      Email: email 
    }
    this.messageService.setDataObs(data);
    this.modalService.open(UpdateUserComponent);
  }
  updateCompany(id: number, name: string, address: string) {
    const data = {
      id: id,
      companyName: name,
      address: address
    }
    this.messageService.setDataObs(data);
    this.modalService.open(UpdateCompanyComponent);
  }

  constructor(
    private dbService: NgxIndexedDBService,
    private modalService: NgbModal,
    private messageService: MessageService
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
