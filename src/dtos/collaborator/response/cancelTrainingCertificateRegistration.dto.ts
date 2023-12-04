import { CancelTrainingCertificateRegistrationParam } from './../parameter/cancelTrainingCertificateRegistration.dto';
export default interface CancelTrainingCertificateRegistrationResponse {
    status: {
      success: boolean,
      message: string,
      errorCode: number
    },
    data: boolean
  }