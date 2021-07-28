import Lead from "./lead";

export default interface LeadsRepository {
    add(lead: Lead): void;
    all(): Promise<Lead[]>;
}