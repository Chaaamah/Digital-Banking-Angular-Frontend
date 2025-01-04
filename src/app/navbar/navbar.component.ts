import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  constructor(protected authService : AuthService, private router : Router) {
  }

  ngOnInit(): void {

  }

  handelLogout() {
    this.authService.logout();
  }
}
