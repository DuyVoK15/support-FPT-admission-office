export default interface FilterPostPayload {
  DateFrom?: string;
  PostCategory?: {
    Id?: string;
    PostCategoryDescription?: string;
    PostCategoryType?: string;
    IsActive?: boolean;
    CreateAt?: string;
    UpdateAt?: string;
  };
  Page?: number;
  PageSize?: number;
}
