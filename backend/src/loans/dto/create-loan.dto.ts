export class CreateLoanDto {
    userId: number;
    contactId: number;
    amount: number;
    interest: number;
    date: string;
    status?: string;
}
