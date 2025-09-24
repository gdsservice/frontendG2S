import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './component/admin-template/admin-template.component';
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatMenu, MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatList, MatListModule } from "@angular/material/list";
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatCard, MatCardAvatar, MatCardModule } from "@angular/material/card";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatBadge, MatBadgeModule } from "@angular/material/badge";
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelect, MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { ErrorDialogComponent } from './component/popup-dialog/error-dialog/error-dialog.component';
import { AddUserComponent } from "./component/utilisateur/add-user/add-user.component";
import { UtilisateurComponent } from "./component/utilisateur/utilisateur.component";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { VenteComponent } from "./component/vente/vente.component";
import { ClientComponent } from "./component/client/client.component";
import { ApprovisionComponent } from "./component/approvision/approvision.component";
import { ProduitComponent } from "./component/produit/produit.component";
import { DetteComponent } from "./component/dette/dette.component";
import { LoginComponent } from "./component/login/login.component";
import { ValidDialogComponent } from './component/popup-dialog/valid-dialog/valid-dialog.component';
import { MatProgressSpinner, MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppHttpInterceptor } from "./interceptors/app-http.interceptor";
import { CategorieComponent } from './component/categorie/categorie.component';
import { AddProdComponent } from './component/produit/add-prod/add-prod.component';
import { AddCatComponent } from './component/categorie/add-cat/add-cat.component';
import { AuthGuard } from "./guards/auth.guard";
import { AuthorizationGuard } from './guards/authorization.guard';
import { AddVenteComponent } from './component/vente/add-vente/add-vente.component';
import { AddClientComponent } from './component/client/add-client/add-client.component';
import { AddApprovComponent } from './component/approvision/add-approv/add-approv.component';
import { AddDetteComponent } from './component/dette/add-dette/add-dette.component';
import { UpdateCatComponent } from './component/categorie/update-cat/update-cat.component';
import { UpdateProdComponent } from './component/produit/update-prod/update-prod.component';
import { UpdateVenteComponent } from './component/vente/update-vente/update-vente.component';
import { UpdateClientComponent } from './component/client/update-client/update-client.component';
import { UpdateApprovComponent } from './component/approvision/update-approv/update-approv.component';
import { UpdateDetteComponent } from './component/dette/update-dette/update-dette.component';
import { ConfirmationDialogVenteComponent } from './component/popup-dialog/confirmation-dialog-vente/confirmation-dialog-vente.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { IgxButtonModule, IgxDialogModule, IgxInputGroupModule, IgxRippleModule, IgxIconModule } from "igniteui-angular";
import { ProduitDialogComponent } from './component/popup-dialog/produit-dialog/produit-dialog.component';
import { ConfirmationDialogSuppVenteComponent } from './component/popup-dialog/confirmation-dialog-supp-vente/confirmation-dialog-supp-vente.component';
import { ConfirmationDialogSuppDetteComponent } from './component/popup-dialog/confirmation-dialog-supp-dette/confirmation-dialog-supp-dette.component';
import { ConfirmationDialogSuppApprovComponent } from './component/popup-dialog/confirmation-dialog-supp-approv/confirmation-dialog-supp-approv.component';
import { ConfirmationDialogSuppClientComponent } from './component/popup-dialog/confirmation-dialog-supp-client/confirmation-dialog-supp-client.component';
import { ConfirmationDialogSuppProdComponent } from './component/popup-dialog/confirmation-dialog-supp-prod/confirmation-dialog-supp-prod.component';
import { ConfirmationDialogSuppCatComponent } from './component/popup-dialog/confirmation-dialog-supp-cat/confirmation-dialog-supp-cat.component';
import { UpdateUserComponent } from './component/utilisateur/update-user/update-user.component';
import { ConfirmationDialogSuppUserComponent } from './component/popup-dialog/confirmation-dialog-supp-user/confirmation-dialog-supp-user.component';
import { LoadingComponent } from './component/loading/loading.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { DetailsVenteComponent } from './component/vente/details-vente/details-vente.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import { DetailsProduitComponent } from './component/produit/details-produit/details-produit.component';
import { CommandeComponent } from './component/commande/commande.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FormatMontantPipe } from './pipes/format-montant.pipe';
import { FormatPhonePipe } from './pipes/format-phone.pipe';
import { CommandeDetailsComponent } from './component/commande/commande-details/commande-details.component';
import { ConfirmationDialogTraiterCdeComponent } from './component/popup-dialog/confirmation-dialog-traiter-cde/confirmation-dialog-traiter-cde.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
	declarations: [
		AppComponent,
		AdminTemplateComponent,
		DashboardComponent,
		VenteComponent,
		ClientComponent,
		ApprovisionComponent,
		ProduitComponent,
		DetteComponent,
		LoginComponent,
		UtilisateurComponent,
		AddUserComponent,
		ErrorDialogComponent,
		ValidDialogComponent,
		CategorieComponent,
		AddProdComponent,
		AddCatComponent,
		AddVenteComponent,
		AddClientComponent,
		AddApprovComponent,
		AddDetteComponent,
		UpdateCatComponent,
		UpdateProdComponent,
		UpdateVenteComponent,
		UpdateClientComponent,
		UpdateApprovComponent,
		UpdateDetteComponent,
		ProduitDialogComponent,
		ConfirmationDialogSuppVenteComponent,
		ConfirmationDialogSuppDetteComponent,
		ConfirmationDialogSuppApprovComponent,
		ConfirmationDialogSuppClientComponent,
		ConfirmationDialogSuppProdComponent,
		ConfirmationDialogSuppCatComponent,
		UpdateUserComponent,
		ConfirmationDialogSuppUserComponent,
		LoadingComponent,
		SpinnerComponent,
		DetailsVenteComponent,
  DetailsProduitComponent,
  CommandeComponent,
  FormatDatePipe,
  FormatMontantPipe,
  FormatPhonePipe,
  CommandeDetailsComponent,
  ConfirmationDialogTraiterCdeComponent,
//   CommandeDetailsComponent,

	],
	imports: [
		QuillModule.forRoot(),
		BrowserModule,
		AppRoutingModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		ReactiveFormsModule,
		MatTableModule,
		MatPaginatorModule,
		HttpClientModule,
		MatSortModule,
		MatSlideToggleModule,
		FormsModule,
		MatBadgeModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatSelectModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		ConfirmationDialogVenteComponent,
		BrowserAnimationsModule,
		IgxButtonModule,
		IgxDialogModule,
		IgxInputGroupModule,
		IgxRippleModule,
		IgxIconModule,
		MatTabsModule,
		MatProgressBarModule,
		MatButtonToggleModule,
		MatCheckboxModule,
		MatRadioModule

	],
	providers: [
		provideAnimationsAsync(), AuthGuard, AuthorizationGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
