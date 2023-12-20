import { DataPosition } from "./dataPosition.model";

export interface DataReport {
  id: number;
  accountId: number;
  positionId: number;
  position: DataPosition;
  salary: number;
  createAt: string;
}

export interface DataRegistrationByReport {
  id: number;
  registrationCode: string;
  positionId: number;
  note: string;
  salary: number;
  status: number;
  schoolBusOption: boolean;
  createAt: string;
  updateAt: string;
  position: DataPosition;
}
