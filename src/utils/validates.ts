import { AccountInfoSignup } from "../models/collaborator/account.model";

export function isAccountInformationValid(accountInfo: AccountInfoSignup): boolean {
  for (const key in accountInfo) {
    if (accountInfo[key as keyof AccountInfoSignup] === "") {
      return true; // Nếu có bất kỳ trường nào là "", trả về true
    }
  }
  return false; // Nếu tất cả các trường không phải là "", trả về false
}

