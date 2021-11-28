import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input() titulo: string;

  constructor(private router: Router) { }

  ngOnInit() {}

  salir(){
    this.router.navigate(['login']); 
    localStorage.removeItem('Lista'); }
}
