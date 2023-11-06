export default interface ViewPostCategoryResponse {
  metadata: {
    page: number;
    size: number;
    total: number;
  };
  data: [
    {
      id: number;
      postCategoryDescription: string;
      postCategoryType: string;
      isActive: boolean;
      createAt: string;
      updateAt: string;
    },
  ] | [];
  isError: boolean;
  message: string;
}
