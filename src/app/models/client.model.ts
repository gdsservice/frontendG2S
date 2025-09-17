export interface ClientModel{

  idClient: string | null,
  nom: string,
  prenom: string,
  adresse: string,
  telephone: string,
  email: string,
  dateAjout: string | null ,
  utilisateurClient?: ClientModel,
}
