type AccountInfo = {
    id: number;
    accountId: number;
    identityNumber: string;
    idStudent: string;
    fbUrl: string;
    address: string;
    personalIdDate: string;
    placeOfIssue: string;
    identityFrontImg: string;
    identityBackImg: string;
    taxNumber: string;
};
type AccountInfoSignup = {
    identityNumber: string;
    idStudent: string;
    fbUrl: string;
    address: string;
    personalIdDate: string;
    placeOfIssue: string;
    identityFrontImg: string;
    identityBackImg: string;
    taxNumber: string;
};
type AccountInfoUpdate = {
    identityNumber: string;
    idStudent: string;
    fbUrl: string;
    address: string;
    personalIdDate: string;
    placeOfIssue: string;
    identityFrontImg: string;
    identityBackImg: string;
    taxNumber: string;
};
export { AccountInfo, AccountInfoSignup, AccountInfoUpdate };
