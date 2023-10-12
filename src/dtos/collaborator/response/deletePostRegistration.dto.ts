export default interface DeletePostRegistraionResponse {
  status: {
    success: boolean;
    message: string;
    errorCode: number;
  };
  data: string;
}
