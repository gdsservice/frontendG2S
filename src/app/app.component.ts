import {Component, OnInit} from '@angular/core';
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  title = 'frontendGestionStock';

  constructor(private loginService: LoginService) {
  }
  ngOnInit(): void {
    this.loginService.loadJwtTokenLocalStorage();
  }
}
