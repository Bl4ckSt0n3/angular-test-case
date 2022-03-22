import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateUserComponent } from './pages/user-info/create-user/create-user.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuardService } from './services/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { ShowUsersComponent } from './pages/login/show-users/show-users.component';
import { AddCompanyComponent } from './pages/user-info/add-company/add-company.component';
import { UpdateUserComponent } from './pages/user-info/update-user/update-user.component';
import { UpdateCompanyComponent } from './pages/user-info/update-company/update-company.component';

// export function migrationFactory() {
//   // The animal table was added with version 2 but none of the existing tables or data needed
//   // to be modified so a migrator for that version is not included.
//   return {
//     1: ((db:any), (transaction: any)) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('country', 'country', { unique: false });
//     },
//     3: (db, transaction) => {
//       const store = transaction.objectStore('people');
//       store.createIndex('age', 'age', { unique: false });
//     }
//   };
// }

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 2,
  objectStoresMeta: [
    {
    store: 'people',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'lastname', keypath: 'lastname', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      ]
    },
    {
    store: 'companies',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'companyName', keypath: 'companyName', options: { unique: false } },
        { name: 'address', keypath: 'address', options: { unique: false } },
      ]
    }
  ],
  // migrationFactory
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserInfoComponent,
    CreateUserComponent,
    ShowUsersComponent,
    AddCompanyComponent,
    UpdateUserComponent,
    UpdateCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token')
        },
        allowedDomains: [],
        disallowedRoutes: []
      }
    })
    
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
