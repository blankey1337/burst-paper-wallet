import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SeedComponent } from './seed/seed.component';
import { AccountService } from './account.service';
import { CreateComponent } from './create/create.component';

import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './api.service';
import { PrintComponent } from './print/print.component';

@NgModule({
  imports:      [ MatInputModule, MatButtonModule, MatCardModule, BrowserAnimationsModule, MatIconModule, MatStepperModule, BrowserModule, FormsModule, MatProgressBarModule ],
  declarations: [ AppComponent, SeedComponent, CreateComponent, PrintComponent ],
  bootstrap:    [ AppComponent ],
  providers: [AccountService, ApiService]
})
export class AppModule { }
