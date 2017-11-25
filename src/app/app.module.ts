import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowErrorComponent } from './show-error/show-error.component';
import { HttpModule } from '@angular/http';
import { User } from './forms/model';
import { UserService } from './forms/service';


@NgModule({
	declarations: [
		AppComponent,
		ShowErrorComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
	],
	providers: [User, UserService],
	bootstrap: [AppComponent],

})
export class AppModule { }
