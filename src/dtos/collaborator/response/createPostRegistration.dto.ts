export default interface CreatePostRegistrationResponse {
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
      salaryBos: number;
      salary: number;
      finalSalary: number;
    },
  ];
}
