// @ts-nocheck
import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {ProjectService} from '../projects.service';
import {takeUntil} from 'rxjs/operators';
import { PageEvent } from "@angular/material/paginator";
import { Subscription } from "rxjs";

import { MatDialogRef} from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'
import {MatDialog} from '@angular/material/dialog'

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProjectsComponent implements OnInit{
  projects: any;
  dataLength: any;
  isLoading = false;
  displayedColumns: string[] = ['title', 'content', 'url'];
  dataSource = new MatTableDataSource();
  totalProjects = 0;
  projectsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private projectsSub: Subscription;
  filterString = '';

  @ViewChild(MatPaginator) paginator:any; // paginator: MatPaginator;
    constructor(private projectService: ProjectService, private dialog: MatDialog) { }

    ngOnInit() {
      this.projectService.getProjects().subscribe(res => {
          const ELEMENT_DATA = [];
          this.projects = res;
          this.projects.forEach(proj => {
              const title = proj.title;
              const content = proj.content;
              const url = proj.url;
              ELEMENT_DATA.push({title: title, content: content, url: url});
          });
          this.isLoading = false;
          this.dataLength = ELEMENT_DATA.length;
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator; // makes the paginator
                                                      // appear in the ui
      });
    }

  filterApps() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
