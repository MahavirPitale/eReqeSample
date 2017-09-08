import { Component, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { Lab } from '../../model/lab.model';


@Component({
  selector: 'app-labslist',
  templateUrl: './labslist.component.html',
  styleUrls: ['./labslist.component.css']
})
export class LabslistComponent implements OnInit {
  Token: string;
  filteredLabs = [];
  labs: Array<Lab> = [];
  constructor(private _http: Http) { }

  ngOnInit() {
    this.Token = JSON.parse(sessionStorage.getItem("Token").toString());
    let headers = new Headers()
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + this.Token);

    let options = new RequestOptions({ headers: headers });

    this._http.get("http://10.10.20.205:8000/v1/labs", options)
      .subscribe(data =>
        //this.filteredLabs = 
         this.labs = data.json().labs
        // console.log(data.json().labs)
      );

    // this.filteredLabs = this.labs;
    // this.labs=data.json(), = >

    // console.log(data.json()));


  }

}
