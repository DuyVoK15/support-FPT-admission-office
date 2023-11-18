export interface FilterPostRegistration {
  Page?: number | null;
  PageSize?: number | null;
  Sort?: string | null;
  Order?: string | null;
  Status?: number | null;
  RegistrationStatus?: number[] | [] ;
}
