export default interface FilterPostPayload {
  DateFrom?: string | null;
  PostCategoryId?: number | null;
  search?: string | null;
  Page?: number | 1;
  PageSize?: number | 0;
  Search?: string | null;
  Sort?: string | null;
  Order?: string | null;
  Status?: number | null;
  CreateAtStart?: string | null;
  CreateAtEnd?: string | null;
  DateFromStart?: string | null;
  DateFromEnd?: string | null;
}
