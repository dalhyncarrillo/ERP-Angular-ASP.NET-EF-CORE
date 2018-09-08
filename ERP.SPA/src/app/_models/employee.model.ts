export interface Employee {
    employeeId?: number,
    email: string,
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    salary: number,
    positionId: number,
    positionName: string
    timestamp?;
}
