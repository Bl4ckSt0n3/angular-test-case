import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private dbService: NgxIndexedDBService,
    ) { }

  companies: Array<any> = [];
  allPeople: Array<any> = [];
  ngOnInit(): void {
    this.dbService.getAll('companies').subscribe((company: any) => {
      console.log(company);
      this.companies = company;
    });
    this.dbService.getAll('people').subscribe((people: any) => {
      // console.log(people);
      this.allPeople = people;
    });
  }
}
