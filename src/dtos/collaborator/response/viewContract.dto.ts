export interface ViewContractResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: [
    {
      id: number;
      contractId: number;
      accountId: number;
      submittedFile: string;
      status: number;
      createAt: string;
      updateAt: string;
      account: {
        id: number;
        roleId: number;
        accountInformationId: number;
        name: string;
        email: string;
        phone: string;
        dateOfBirth: string;
        imgUrl: string;
        postPermission: boolean;
        isPremium: boolean;
        isActive: boolean;
        isBanned: boolean;
        createAt: string;
        updateAt: string;
        accountInformation: {
          id: number;
          accountId: number;
          identityNumber: string;
          idStudent: string;
          fbUrl: string;
          address: string;
          identityIssueDate: string;
          placeOfIssue: string;
          identityFrontImg: string;
          identityBackImg: string;
          taxNumber: string;
        };
      };
      contract: {
        id: number;
        createPersonId: number;
        contractName: string;
        contractDescription: string;
        sampleFile: string;
        signingDate: string;
        startDate: string;
        totalSalary: number;
        isActive: boolean;
        createAt: string;
        updateAt: string;
        createPerson: {
          id: number;
          roleId: number;
          accountInformationId: number;
          name: string;
          email: string;
          phone: string;
          dateOfBirth: string;
          imgUrl: string;
          postPermission: boolean;
          isPremium: boolean;
          isActive: boolean;
          isBanned: boolean;
          createAt: string;
          updateAt: string;
          accountInformation: {
            id: number;
            accountId: number;
            identityNumber: string;
            idStudent: string;
            fbUrl: string;
            address: string;
            identityIssueDate: string;
            placeOfIssue: string;
            identityFrontImg: string;
            identityBackImg: string;
            taxNumber: string;
          };
        };
      };
    },
  ];
  isError: boolean;
  message: string;
}