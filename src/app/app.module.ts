import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';


import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

import {HttpClientModule} from '@angular/common/http';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {ProjectService} from './projects.service';
import {ProjectsComponent} from './projects/projects.component';
import {GroupProjectsComponent} from './group-projects/group-projects.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    GroupProjectsComponent,
    AppComponent,
    ProjectsComponent,
    NavbarComponent
  ], 
  imports: [
      MatProgressSpinnerModule,
      HttpClientModule,
      MatDialogModule,
      BrowserModule,
      MatTableModule,
      MatPaginatorModule,
      MatToolbarModule,
      MatSidenavModule,
      MatListModule,
      MatIconModule,
      MatButtonModule,
      MatFormFieldModule,
      FormsModule,
      MatInputModule,
      BrowserAnimationsModule,
      MatCardModule,
      MatToolbarModule,
      RouterModule.forRoot([
        {path: '', component: ProjectsComponent},
        {path: 'projects/:tag', component: GroupProjectsComponent}
      ]),
      
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
