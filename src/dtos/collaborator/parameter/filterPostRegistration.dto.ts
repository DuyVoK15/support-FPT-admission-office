export interface FilterPostRegistration {
  Id?: number | null;
  Page?: number | null;
  PageSize?: number | null;
  Sort?: string | null;
  Order?: string | null;
  Status?: number | null;
  RegistrationStatus?: number[] | [];
}
