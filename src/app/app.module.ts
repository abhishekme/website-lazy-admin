import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
/*import { HeaderComponent } from './admin/layout/header/header.component';
import { SidebarComponent } from './admin/layout/sidebar/sidebar.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
*/
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './admin/login/login.component';
import { DynaFormComponent } from './front/dyna-form/dyna-form.component';
import { FrontComponent } from './front/front.component';
import { HomeComponent } from './front/home/home.component';

import { routes } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AuthGuard  } from './admin/services/auth/auth.guard';
import { AuthCheckService  } from './admin/services/auth/auth-check.service';
import { AuthService  } from './admin/services/auth/auth.service';
import { Path } from './admin/services/config/path';
import { AdminComponent } from './admin/admin.component';

import { PartialModule } from './partial/partial.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { CustomMaterialModule } from './core/material.module';
import { GridModule } from '@progress/kendo-angular-grid';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule
} from '@angular/material';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';






@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    /*HeaderComponent,
    SidebarComponent,
    FooterComponent,*/
    DashboardComponent,
    UsersComponent,
    LoginComponent,
    DynaFormComponent,
    FrontComponent,
    HomeComponent,
  ],
  imports: [
    GridModule,
    MatToolbarModule,
    
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    PartialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule,
    RouterModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    Ng4LoadingSpinnerModule.forRoot(),
    ButtonsModule,
    InputsModule,
    ExcelExportModule,
    DropDownsModule,
    DateInputsModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [AuthGuard, AuthCheckService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('AppModule loaded.');
  }
}
