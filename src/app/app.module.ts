import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pageComponent/header/header.component';
import { MainComponent } from './pageComponent/main/main.component';
import { TodoComponentComponent } from './todo-component/todo-component.component';
import { WorkGroupComponent } from './work-group/work-group.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TodoComponentComponent,
    WorkGroupComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
