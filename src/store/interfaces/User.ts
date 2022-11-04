export interface User {
  id: number;
  email:string,
  type_document:string,
  number_document_identity:number,
  type_identity_card:string,
  first_name:string,
  last_name:string,
  username:string,
  position_id:number,
  phone:string,
  password:number,
  roles:number,
  state_id:number,
  municipality_id:number,
  parishe_id:number,
  country_id:237,
  is_active:1,
  code: number,
  message: string,
  created_at: string;
  updated_at: string;
  deleted_at?: any;
}

