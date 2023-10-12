type DataViewPostRegistration = [
  {
    id: number;
    registrationCode: string;
    status: number;
    schoolBusOption: boolean;
    createAt: string;
    updateAt: string;
    postRegistrationDetail: 
      {
        id: number;
        postRegistrationId: number;
        note: string;
        salary: number;
        post: {
          id: number,
          accountId: number,
          postCategoryId: number,
          postCode: string,
          postImg: string,
          postDescription: string,
          priority: number,
          dateFrom: string,
          dateTo: string,
          isPremium: boolean,
          status: number,
          attendanceComplete: boolean,
          createAt: string,
          updateAt: string,
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
            accountInformation: {
              id: number,
              accountId: number,
              identityNumber: string,
              idStudent: string,
              fbUrl: string,
              address: string,
              identityIssueDate: string,
              placeOfIssue: string,
              identityFrontImg: string,
              identityBackImg: string,
              taxNumber: string
            }
          },
          postCategory: {
            id: number,
            postCategoryDescription: string,
            postCategoryType: string,
            isActive: boolean,
            createAt: string,
            updateAt: string
          }
        },
        postPosition: {
          id: number,
          postId: number,
          trainingCertificateId: number,
          documentId: number,
          positionName: string,
          schoolName: string,
          location: string,
          latitude: string,
          longtitude: string,
          timeFrom: {
            ticks: number,
            days: number,
            hours: number,
            milliseconds: number,
            minutes: number,
            seconds: number,
            totalDays: number,
            totalHours: number,
            totalMilliseconds: number,
            totalMinutes: number,
            totalSeconds: number
          },
          timeTo: {
            ticks: number,
            days: number,
            hours: number,
            milliseconds: number,
            minutes: number,
            seconds: number,
            totalDays: number,
            totalHours: number,
            totalMilliseconds: number,
            totalMinutes: number,
            totalSeconds: number
          },
          status: number,
          isBusService: boolean,
          amount: number,
          salary: number,
          registerAmount: number
        }
      },
  },
];
export default DataViewPostRegistration;