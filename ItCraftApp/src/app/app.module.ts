import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TableComponent } from 'src/app/home/table/table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductStatisticsComponent } from './home/productStatistics/productStatistics.component';
import { DeleteProductComponent } from './home/table/deleteProduct/deleteProduct.component';
import { AddProductFormComponent } from './home/add-product-form/add-product-form.component';
import { HeaderComponent } from './home/header/header.component';
import { AccountingComponent } from './home/productStatistics/accounting/accounting.component';
import { IncomeOutcomeFormComponent } from './home/table/income-outcome-form/income-outcome-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TableComponent,
    AddProductFormComponent,
    ProductStatisticsComponent,
    IncomeOutcomeFormComponent,
    DeleteProductComponent,
    AccountingComponent
  ],
  entryComponents: [IncomeOutcomeFormComponent, DeleteProductComponent, AccountingComponent],
  imports: [
    MatDialogModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [
    UserComponent, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
