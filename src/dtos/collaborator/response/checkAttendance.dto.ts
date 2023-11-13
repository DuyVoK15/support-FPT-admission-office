export interface CheckAttendanceResponse {
    status: {
      success: boolean | null,
      message: string | null,
      errorCode: number | null
    },
    data: string | null
  }