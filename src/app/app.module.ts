import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './pageComponent/main/main.component';
import { TaskComponentComponent } from './component/task-component/task-component.component';
import { WorkGroupComponent } from './component/work-group/work-group.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { EditDialogComponent } from './component/task-component/edit-dialog/edit-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AddTaskComponent } from './component/work-group/add-task/add-task.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FilterByNamePipe } from './pipes/filter-by-name.pipe';
import { FilterByPriorityPipe } from './pipes/filter-by-priority.pipe';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginPageComponent } from './pageComponent/login/login-page/login-page.component';
import { HTTPInterceptorService } from './services/interceptor-http.service';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TaskComponentComponent,
    WorkGroupComponent,
    EditDialogComponent,
    AddTaskComponent,
    FilterByNamePipe,
    FilterByPriorityPipe,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    ScrollingModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: HTTPInterceptorService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
