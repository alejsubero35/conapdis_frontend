export interface UpdatePassword {
    old_password: string;
    new_password: string;
    new_password_confirmation: string;
    code: number;
    message: string;
  
}