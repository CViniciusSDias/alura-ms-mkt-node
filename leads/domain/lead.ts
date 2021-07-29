import LeadStatus from './lead-status';
import NonCustomerError from './non-customer-error';

export default class Lead {
    public _id: string|undefined = undefined;

    constructor(
        public readonly fullName: string,
        public readonly email: string,
        private leadStatus: LeadStatus = LeadStatus.INTERESTED
    ) {
    }

    get status(): LeadStatus {
        return this.leadStatus;
    }

    convert(): void {
        this.leadStatus = LeadStatus.CUSTOMER;
    }

    lose(): void {
        if (this.leadStatus === LeadStatus.CANCELED) {
            return;
        }

        if (this.leadStatus !== LeadStatus.CUSTOMER) {
            throw new NonCustomerError();
        }

        this.leadStatus = LeadStatus.CANCELED;
    }
}
