import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";

export default class GenerateLead {
    public constructor(private leadRepository: LeadsRepository) {}

    public execute({ fullName, email }: { fullName: string, email: string }): boolean {
        const lead = new Lead(fullName, email);
        this.leadRepository.add(lead);

        return true;
    }
}