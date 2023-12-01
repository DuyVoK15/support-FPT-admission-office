export interface ViewApplicationResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: [
    {
      id: number;
      accountId: number;
      reportDate: string;
      replyDate: string;
      problemNote: string;
      replyNote: string;
      status: number;
    },
  ];
  isError: true;
  message: string;
}
