import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {


    constructor(public auth: AuthService) {

  }

  ngOnInit() {
  }

}
