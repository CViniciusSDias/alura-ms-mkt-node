export default class NonCustomerError extends Error {
    constructor() {
        super();
        this.name = 'NonCustomerError';
    }
}