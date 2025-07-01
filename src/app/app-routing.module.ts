import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminTemplateComponent} from "./component/admin-template/admin-template.component";
import {LoginComponent} from "./component/login/login.component";
import {ApprovisionComponent} from "./component/approvision/approvision.component";
import {UtilisateurComponent} from "./component/utilisateur/utilisateur.component";
import {AddUserComponent} from "./component/utilisateur/add-user/add-user.component";
import {VenteComponent} from "./component/vente/vente.component";
import {ProduitComponent} from "./component/produit/produit.component";
import {DetteComponent} from "./component/dette/dette.component";
import {ClientComponent} from "./component/client/client.component";
import {DashboardComponent} from "./component/dashboard/dashboard.component";
import {CategorieComponent} from "./component/categorie/categorie.component";
import {AddProdComponent} from "./component/produit/add-prod/add-prod.component";
import {AddCatComponent} from "./component/categorie/add-cat/add-cat.component";
import {AuthGuard} from "./guards/auth.guard";
import { AuthorizationGuard } from './guards/authorization.guard';
import {AddClientComponent} from "./component/client/add-client/add-client.component";
import {AddVenteComponent} from "./component/vente/add-vente/add-vente.component";
import {AddApprovComponent} from "./component/approvision/add-approv/add-approv.component";
import {AddDetteComponent} from "./component/dette/add-dette/add-dette.component";
import {UpdateCatComponent} from "./component/categorie/update-cat/update-cat.component";
import {UpdateProdComponent} from "./component/produit/update-prod/update-prod.component";
import {UpdateVenteComponent} from "./component/vente/update-vente/update-vente.component";
import {UpdateClientComponent} from "./component/client/update-client/update-client.component";
import {UpdateApprovComponent} from "./component/approvision/update-approv/update-approv.component";
import {UpdateDetteComponent} from "./component/dette/update-dette/update-dette.component";
import {UpdateUserComponent} from "./component/utilisateur/update-user/update-user.component";
import { DetailsVenteComponent } from './component/vente/details-vente/details-vente.component';
import { DetailsProduitComponent } from './component/produit/details-produit/details-produit.component';

const routes: Routes = [
  {path: "", component: LoginComponent},
  {path: "login", component: LoginComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "admin", component: AdminTemplateComponent,
    canActivate : [AuthGuard],
    children : [
      {path: "dashboard", component: DashboardComponent},
      {path: "approvision", component: ApprovisionComponent},
      {path: "updateApprov/:idApprov", component: UpdateApprovComponent},
      {path: "addApprov", component: AddApprovComponent},
      {path: "client", component: ClientComponent},
      {path: "updateClient/:idClient", component: UpdateClientComponent},
      {path: "addClient", component: AddClientComponent},
      {path: "dette", component: DetteComponent},
      {path: "updateDette/:idDette", component: UpdateDetteComponent},
      {path: "addDette", component: AddDetteComponent},
      {path: "produit", component: ProduitComponent},
      {path: "detailsProd/:idProd", component: DetailsProduitComponent},
      {path: "updateProd/:idProd", component: UpdateProdComponent},
      {path: "addProd", component: AddProdComponent},
      {path: "categorie", component: CategorieComponent},
      {path: "categorie", component: CategorieComponent},
      {path: "updateCat/:idCat", component: UpdateCatComponent},
      {path: "addCat", component: AddCatComponent},
      {path: "vente", component: VenteComponent},
      {path: "addVente", component: AddVenteComponent},
      {path: "updateVente/:idVente", component: UpdateVenteComponent},
      {path: "detailsVente/:idVente", component: DetailsVenteComponent},
      {path: "addUser", component: AddUserComponent},
      {path: "updateUser/:id", component: UpdateUserComponent},
      {
        path: 'utilisateur', component: UtilisateurComponent,
        canActivate: [AuthorizationGuard],
        data: { roles: ['SUPER_ADMIN'] }
      },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
