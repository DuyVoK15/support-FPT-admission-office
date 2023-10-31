export interface ViewReportResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: [
    {
      id: number;
      accountId: number;
      postId: number;
      positionId: number;
      salary: number;
      createAt: string;
    },
  ];
  isError: boolean;
  message: string;
}

export interface ViewRegistrationReportResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: {
    id: number;
    registrationCode: string;
    status: number;
    schoolBusOption: boolean;
    createAt: string;
    updateAt: string;
    postRegistrationDetails: [
      {
        id: number;
        postRegistrationId: number;
        postId: number;
        positionId: number;
        note: string;
        salary: number;
        post: {
          id: number;
          accountId: number;
          postCategoryId: number;
          postCode: string;
          postImg: string;
          postDescription: string;
          priority: number;
          dateFrom: string;
          dateTo: string;
          isPremium: boolean;
          status: number;
          attendanceComplete: boolean;
          createAt: string;
          updateAt: string;
          postPositions: [
            {
              id: number;
              postId: number;
              trainingCertificateId: number;
              documentId: number;
              positionName: string;
              positionDescription: string;
              schoolName: string;
              location: string;
              latitude: string;
              longtitude: string;
              timeFrom: string;
              timeTo: string;
              status: number;
              isBusService: boolean;
              amount: number;
              salary: number;
            },
          ];
        };
      },
    ];
  };
}
