import {Component, OnInit} from '@angular/core';
import {convertNumericIdToAddress} from '@burstjs/util';
import {Account} from '@burstjs/core';
import {
  generateMasterKeys,
  getAccountIdFromPublicKey,
  PassPhraseGenerator
} from '@burstjs/crypto';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-seed',
  styleUrls: ['./seed.component.scss'],
  templateUrl: './seed.component.html'
})
export class SeedComponent {
  private seedLimit = 100;
  private seed: any[] = [];
  private update = false;
  public progress = 0;
  passphraseGenerator: PassPhraseGenerator;

  constructor(
    private accountService: AccountService
  ) {
    this.passphraseGenerator = new PassPhraseGenerator();
  }

  public movement(e) {
    this.seed.push([e.clientX, e.clientY, new Date()]);
    if (!this.update) {
      this.update = true;
      setTimeout(() => {
        this.progress = this.seed.length / this.seedLimit * 100;
        this.update = false;
      }, 100);
    }
    if (this.seed.length >= this.seedLimit) {
      this.passphraseGenerator.generatePassPhrase(this.seed)
        .then(phrase => {
          this.setPassphraseAndGenerateMasterKeys(phrase);
        });
    }
  }
  
  public setPassphraseAndGenerateMasterKeys(phrase: string[]) {
    this.accountService.setPassphrase(phrase);
    const keys = generateMasterKeys(this.accountService.getCompletePassphrase());
    const id = getAccountIdFromPublicKey(keys.publicKey);
    const address = convertNumericIdToAddress(id);
    this.accountService.setAccount(new Account({
      account: id,
      accountRS: address,
      keys
    }));
    this.seed = [];
    setTimeout(() => {
      this.accountService.setStepIndex(1);
    }, 1);
  }
}
