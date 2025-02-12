import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import { filter, map } from 'rxjs/operators';

@Injectable()
export class ProjectService {
    private projects: any;
    private projectsUpdated = new Subject<{ projects: any; projectCount: number }>();
    url = 'https://gray-projects.herokuapp.com';
    // url = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getProjects() {
        return this.http.get(this.url + '/api/admin/users');
    }

    getGroupProjects(tag: string) {
      console.log("TAG: ", tag);
      return this.http.get(this.url + `/api/admin/users/${tag}`);
  }
}