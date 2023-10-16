import { AccountInfo } from "./account.model"

export type CertificateData = [
    {
      id: number,
      status: number,
      createAt: string,
      updateAt: string,
      createPerson: {
        id: number,
        roleId: number,
        accountInformationId: number,
        name: string,
        email: string,
        phone: string,
        dateOfBirth: string,
        imgUrl: string,
        postPermission: boolean,
        isPremium: boolean,
        isActive: boolean,
        createAt: string,
        updateAt: string,
        accountInformation: AccountInfo,
        accountCertificateAccounts: [
          string
        ]
      },
      account: {
        id: number,
        roleId: number,
        accountInformationId: number,
        name: string,
        email: string,
        phone: string,
        dateOfBirth: string,
        imgUrl: string,
        postPermission: boolean,
        isPremium: boolean,
        isActive: boolean,
        createAt: string,
        updateAt: string,
        accountInformation: AccountInfo,
        accountCertificateAccounts: [
          string
        ]
      },
      traningCertificate: {
        id: number,
        trainingTypeId: string,
        certificateName: string,
        createAt: string,
        updateAt: string
      }
    }
  ]