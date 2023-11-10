export default interface FilterPostPayload {
  DateFrom?: string;
  PostCategoryId?: number | null;
  Page?: number | 1;
  PageSize?: number | 0;
  Sort?: string;
  Status?: number;
}
