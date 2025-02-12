// @ts-nocheck
import {Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-projects',
    templateUrl: './group-projects.component.html',
    styleUrls: ['./group-projects.component.css']
})
export class GroupProjectsComponent implements OnInit{
  projects: any;
  dataLength: any;
  isLoading = false;
  displayedColumns: string[] = ['title', 'content', 'url'];
  dataSource = new MatTableDataSource();
  tag: string;
  filterString = '';
  

  @ViewChild(MatPaginator) paginator:any; // paginator: MatPaginator;
    constructor(
      private router: Router,
      private route: ActivatedRoute, 
      private projectService: ProjectService, 
      private dialog: MatDialog
    ) { }

  

    ngOnInit() {
      // Get id from url
      this.tag = this.route.snapshot.params['tag'];

      this.projectService.getGroupProjects(this.tag).subscribe(res => {
        const ELEMENT_DATA = [];
        this.projects = res;
        this.projects.forEach(proj => {
            const title = proj.title;
            const content = proj.content;
            const url = proj.url;
            const tag = proj.tag;
            ELEMENT_DATA.push({title: title, content: content, url: url, tag: tag});
        });
        this.isLoading = false;
        this.dataLength = ELEMENT_DATA.length;
        this.dataSource.data = ELEMENT_DATA;
        this.dataSource.paginator = this.paginator; // makes the paginator
                                                    // appear in the ui
    });

      this.route.params.forEach((params: Params) => {
        console.log(params.tag); // Your params called every change
        if (params.tag !== this.tag) {
          location.reload();
        }
        this.projectService.getGroupProjects(params.tag).subscribe(res => {
          const ELEMENT_DATA = [];
          this.projects = res;
          this.projects.forEach(proj => {
              const title = proj.title;
              const content = proj.content;
              const url = proj.url;
              const tag = proj.tag;
              ELEMENT_DATA.push({title: title, content: content, url: url, tag: tag});
          });
          this.isLoading = false;
          this.dataLength = ELEMENT_DATA.length;
          this.dataSource.data = ELEMENT_DATA;
          this.dataSource.paginator = this.paginator; // makes the paginator
                                                      // appear in the ui
      });
    });
  }

  filterApps() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
