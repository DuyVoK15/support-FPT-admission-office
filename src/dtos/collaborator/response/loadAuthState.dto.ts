export default interface LoadAuthStateResponse {
    isAuthenticated: boolean;
    roleId: string | -1;
}