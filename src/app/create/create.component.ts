import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  ngOnInit() {
  }

}