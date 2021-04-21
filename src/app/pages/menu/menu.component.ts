import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  leftHanded=false;

  constructor() { }

  ngOnInit(): void {
    this.leftHanded = localStorage.getItem(Constants.handConfig) == "1";
  }

  saveChanges(){
    localStorage.setItem(Constants.handConfig, this.leftHanded?"1":"0");
  }



}
