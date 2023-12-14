import { DataPosition } from './dataPosition.model';
import { DataPost } from './dataPost.model';

interface DataViewPostRegistration {
  id: number;
  registrationCode: string;
  status: number;
  schoolBusOption: boolean;
  createAt: string;
  updateAt: string;
  cancelTime: string;
  confirmTime: string;
  positionId: number;
  note: string;
  postPositionsUnregistereds: DataPosition[] | [];
  isUpdated: boolean;
  isNearCheckIn: boolean;
  post: DataPost;
  postPosition: DataPosition;
  checkAttendances: [
    {
      id: number;
      postId: number;
      positionId: number;
      checkInTime: string;
      checkOutTime: string;
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
        createAt: string;
        updateAt: string;
        timeFrom: string;
        timeTo: string;
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
        postCategory: {
          id: number;
          postCategoryDescription: string;
          postCategoryType: string;
          isActive: boolean;
          createAt: string;
          updateAt: string;
        };
        postPositions: [
          {
            id: number;
            postId: number;
            trainingCertificateId: number;
            certificateName: string;
            documentId: number;
            positionName: string;
            positionDescription: string;
            schoolName: string;
            location: string;
            date: string;
            latitude: string;
            longitude: string;
            timeFrom: string;
            timeTo: string;
            status: number;
            isBusService: boolean;
            amount: number;
            salary: number;
            positionRegisterAmount: number;
          },
        ];
      };
    },
  ];
}

export default DataViewPostRegistration;
