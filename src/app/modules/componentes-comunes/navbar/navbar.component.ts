import { Component, OnInit } from '@angular/core';
import { LoginService } from '../servicios/login.service';
import { Router } from '@angular/router';
import { AutenticationInterface } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  btnSesion!: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
