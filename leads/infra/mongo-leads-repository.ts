import Lead from "../domain/lead";
import LeadsRepository from "../domain/leads-respository";
import mongoose, { Schema, Model } from 'mongoose';

export default class MongoLeadsRepository implements LeadsRepository {
    private leadSchema: Schema;
    private LeadModel: Model<Lead>;

    constructor() {
        // @ts-ignore
        mongoose.connect('mongodb://mkt-usuario:mkt-senha@mongo-mkt:27017/mkt?authSource=admin', { useNewUrlParser: true });
        this.leadSchema = new Schema({
            fullName: String,
            email: String
        });
        this.LeadModel = mongoose.model('Lead', this.leadSchema);
    }

    add(lead: Lead): void {
        const leadModel = new this.LeadModel({...lead});
        leadModel.save();
    }

    async all(): Promise<Lead[]> {
        const leads = await this.LeadModel.find({});
        return leads;
    }
}