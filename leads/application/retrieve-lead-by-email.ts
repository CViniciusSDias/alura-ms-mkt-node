import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";

export default class RetrieveLeadByEmail {
    public constructor(private leadRepository: LeadsRepository) {}

    async execute(email: string): Promise<Lead|null> {
        const lead = await this.leadRepository.byEmail(email);
        if (lead === null) {
            return null;
        }

        lead._id = undefined;

        return lead;
    }
}