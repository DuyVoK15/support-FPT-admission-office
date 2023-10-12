export default interface UpdatePostRegistrationResponse {
    status: {
      success: true,
      message: string,
      errorCode: number
    },
    data: {
      id: number,
      registrationCode: string,
      status: number,
      schoolBusOption: boolean,
      createAt: string,
      updateAt: string,
      postRegistrationDetails: [
        {
          id: number,
          postRegistrationId: number,
          postId: number,
          positionId: number,
          note: string,
          salaryBonus: number,
          salary: number,
          finalSalary: number
        }
      ]
    }
  }