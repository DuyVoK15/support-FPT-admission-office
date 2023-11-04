export default interface FilterPostPayload {
  DateFrom?: string;
  PostCategoryId?: number | null;
  Page?: number;
  PageSize?: number;
  Sort?: string;
  Status?: number;
}
