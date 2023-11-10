export default interface CancelPostRegistraionResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: string;
}
