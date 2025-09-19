import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public spinnerProgress: boolean = false;
  public errorMessage: string = ""; 
  // imagePath: string = '/assets/background1.jpg';

  constructor(private fb: FormBuilder,
              private router: Router,
              private loginService: LoginService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control(''),
      password: this.fb.control('')
    });
  }

  login() {
    this.spinnerProgress = true;
    this.errorMessage = ""; 

    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.loginService.login(username, password).subscribe({
      next: data => {
        this.spinnerProgress = false;
        this.loginService.loadProfile(data);
        this.router.navigateByUrl("/admin/dashboard");
      },
      error: err => {
        this.spinnerProgress = false;

        // Gérer les erreurs selon le statut HTTP
        if (err.status === 409) {
          this.errorMessage = "Cet utilisateur existe déjà. Veuillez contacter l'administrateur.";
        } else if (err.status === 404) {
          this.errorMessage = "Utilisateur introuvable. Vérifiez vos identifiants.";
        } else if (err.status === 400) {
          this.errorMessage = err.error.message || "Requête invalide.";
        } else if (err.status === 403) {
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer";
        } else {
          this.errorMessage = "Erreur inconnue. Veuillez réessayer.";
        }
      }
    });
  }
}

