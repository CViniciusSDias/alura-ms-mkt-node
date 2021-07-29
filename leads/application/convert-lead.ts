import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";

export default class ConvertLead {
    public constructor(private leadRepository: LeadsRepository) {}

    public async execute(email: string): Promise<boolean> {
        const lead = await this.leadRepository.byEmail(email);
        if (lead === null) {
            return false;
        }

        lead.convert();
        this.leadRepository.update(lead);

        return true;
    }
}