export default interface FilterPostPayload {
  DateFrom?: string | null;
  PostCategoryId?: number | null;
  search?: string | null;
  Page?: number | 1;
  PageSize?: number | 0;
  Sort?: string | null;
  Status?: number | null;
}
