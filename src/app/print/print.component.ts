import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '@burstjs/core';

@Component({
    selector: 'app-print',
    styleUrls: ['./print.component.scss'],
    templateUrl: './print.component.html'
})
export class PrintComponent implements OnInit {
  private account: Account;
  private imgSrc: string;
  constructor(
      public accountService: AccountService
  ) { 
    this.accountService.account.subscribe(async (account) => {
      this.account = account;
      this.imgSrc = await this.accountService.generateSendTransactionQRCodeAddress();
    })
  }

  public ngOnInit() {

  }

  public ngOnDestroy() {

  }

  public reset() {
    this.accountService.reset();
    setTimeout(x => {
        this.accountService.setStepIndex(0);
    }, 0);
  }

  public next() {
    this.accountService.setStepIndex(2);
  }

  public copy() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.accountService.getCompletePassphrase();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  public print() {
    window.print();
  }
}
