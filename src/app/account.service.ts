import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';
import {
  Account,
  AliasList,
  Api,
  Balance,
  Transaction,
  TransactionId,
  TransactionList,
  UnconfirmedTransactionList
} from '@burstjs/core';
import {decryptAES, encryptAES, generateMasterKeys, getAccountIdFromPublicKey, hashSHA256, Keys} from '@burstjs/crypto';
import {
  convertAddressToNumericId,
  convertNumericIdToAddress,
  isBurstAddress,
  sumNQTStringToNumber
} from '@burstjs/util';
import {ApiService} from './api.service';
import {HttpError, HttpImpl as Http} from '@burstjs/http';

interface SetAccountInfoRequest {
  name: string;
  description: string;
  deadline: number;
  feeNQT: string;
  pin: string;
  keys: Keys;
}

interface SetRewardRecipientRequest {
  recipient: string;
  deadline: number;
  feeNQT: string;
  pin: string;
  keys: Keys;
}

interface SetAliasRequest {
  aliasName: string;
  aliasURI: string;
  deadline: number;
  feeNQT: string;
  pin: string;
  keys: Keys;
}

interface NodeDescriptor {
  url: string;
}

@Injectable()
export class AccountService {
  private passphrase: string[];
  private stepIndex: number;
  public account: BehaviorSubject<Account> = new BehaviorSubject(undefined);
  private api: Api;

  constructor(private apiService: ApiService) {
    this.api = this.apiService.api;
    this.passphrase = [];
  }

  public setAccount(account: Account): void {
    this.account.next(account);
  }
  public setPassphrase(passphrase: string[]): void {
    this.passphrase = passphrase;
  }

  public generateSendTransactionQRCodeAddress(): Promise<string> {
    if (this.account.value) {
      return this.api.account.generateSendTransactionQRCodeAddress(
        this.account.value.account
      ); 
    }
  }

  public getPassphrasePart(index: number): string {
      return this.passphrase[index];
  }

  public getCompletePassphrase(): string {
      return this.passphrase.join(' ');
  }

  public setStepIndex(index: number) {
      this.stepIndex = index;
  }

  public getStepIndex(): number {
      return this.stepIndex;
  }

  public isPassphraseGenerated(): boolean {
      return this.passphrase.length > 0 &&
        this.account.value !== undefined;
  }

  public reset() {
      this.passphrase = [];
      this.setAccount(undefined);
  }
}
