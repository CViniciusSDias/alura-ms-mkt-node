import LeadStatus from './lead-status';
import NonCustomerError from './non-customer-error';

export default class Lead {
    private status: LeadStatus;

    constructor(public readonly fullName: string, public readonly email: string) {
        this.status = LeadStatus.INTERESTED;
    }

    convert(): void {
        this.status = LeadStatus.CUSTOMER;
    }

    lose(): void {
        if (this.status === LeadStatus.CANCELED) {
            return;
        }

        if (this.status !== LeadStatus.CUSTOMER) {
            throw new NonCustomerError();
        }

        this.status = LeadStatus.CANCELED;
    }
}
