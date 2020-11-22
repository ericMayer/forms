import { Endereco } from "./endereco.interface";

export interface Usuario {
  nome?: string;
  email?: string;
  cpf?: string;
  endereco?: Endereco;
}