import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';

import {ConpanyTree} from "./conpanyTree/company-tree.app";
import { NgTree} from './conpanyTree/conpany-tree.component';

import { ConpanyTreeService } from './conpanyTree/conpany-tree.service';


@NgModule({
  imports:      [ BrowserModule ,FormsModule],
  declarations: [ NgTree,ConpanyTree,AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ConpanyTreeService]
})
export class AppModule { }
