import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";
import mongoose, { Schema, Model } from 'mongoose';
import envConfig from "../../env-config";

export default class MongooseLeadsRepository implements LeadsRepository {
    private leadSchema: Schema;
    private LeadModel: Model<Lead>;

    constructor() {
        mongoose.connect(envConfig.mongoUrl);
        this.leadSchema = new Schema({
            fullName: String,
            email: String,
            status: Number,
        });
        this.LeadModel = mongoose.model('Lead', this.leadSchema);
    }

    add(lead: Lead): void {
        const leadModel = new this.LeadModel({...lead, status: lead.status});
        leadModel.save();
    }

    async all(): Promise<Lead[]> {
        const leads = await this.LeadModel.find({});
        return leads
            .map((model: any) => new Lead(model.fullName, model.email, model.status));
    }

    async byEmail(email: string): Promise<Lead|null> {
        const model = await this.LeadModel.findOne({ email });
        if (model === null) {
            return null;
        }

        const lead = new Lead(model.fullName, model.email, model.status);
        lead._id = model._id;

        return lead;
    }

    async update(lead: Lead): Promise<boolean> {
        const result = await this.LeadModel.replaceOne({ _id: lead._id }, { ...lead, status: lead.status });

        // @ts-ignore
        return result.n === 1;
    }
}