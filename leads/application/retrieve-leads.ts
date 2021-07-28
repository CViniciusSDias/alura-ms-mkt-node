import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";

export default class RetrieveLeads {
    public constructor(private leadRepository: LeadsRepository) {}

    async execute(): Promise<Lead[]> {
        return this.leadRepository.all();
    }
}