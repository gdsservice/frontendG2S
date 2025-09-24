export interface UserModel{

  id: number | null,
  nom: string,
  prenom: string,
  telephone: string,
  email: string,
  roles: UserRole[],
  password: string,
  activation: string,
  authentification: TypeAuth
}

export interface UserRole {
  name: TypeRole;
}

export enum TypeRole{
  SUPER_ADMIN,ADMIN, USER
}

export enum TypeActive{
  ACTIVER, DESACTIVER
}

export enum TypeAuth{
  TRUE, FALSE
}
