import { AccountInfoSignup } from '../models/collaborator/account.model';

export function isAccountInformationValid(
  accountInfo: AccountInfoSignup
): boolean {
  for (const key in accountInfo) {
    if (accountInfo[key as keyof AccountInfoSignup] === '') {
      return true; // Nếu có bất kỳ trường nào là "", trả về true
    }
  }
  return false; // Nếu tất cả các trường không phải là "", trả về false
}

// function checkAnyPropertiesInObjectIsNull(obj: AccountInfoSignup) {
//   for (let key in obj) {
//     if (obj[key] === null || (typeof obj[key] === 'object' && obj[key] === null)) {
//       // Nếu thuộc tính có giá trị là null hoặc là một đối tượng null
//       // Thực hiện hành động 1
//       console.log(`Thuộc tính ${key} có giá trị null hoặc là một đối tượng null`);
//       // Thực hiện hành động 1 ở đây
//     } else {
//       // Nếu thuộc tính không null và không phải là một đối tượng null
//       // Thực hiện hành động 2
//       console.log(`Thuộc tính ${key} có giá trị không phải null và không phải là một đối tượng null`);
//       // Thực hiện hành động 2 ở đây
//     }
//   }
// }
