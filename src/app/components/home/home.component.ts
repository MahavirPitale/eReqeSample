import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
Token:string;
name:string;

  constructor(private router:Router) { }

  ngOnInit() {
    this.Token = JSON.parse(sessionStorage.getItem("Token").toString());
    this.name = JSON.parse(sessionStorage.getItem("name").toString());
    console.log(this.Token);
  }
  logout(){
    this.router.navigate(['/login']);
    sessionStorage.removeItem("Token");
  }

}
