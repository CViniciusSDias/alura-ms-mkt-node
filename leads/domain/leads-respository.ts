import Lead from "./lead";

export default interface LeadsRepository {
    add(lead: Lead): void;
    all(): Promise<Lead[]>;
    byEmail(email: string): Promise<Lead|null>;
    update(lead: Lead): Promise<boolean>;
}