import express from "express";
import GenerateLead from "../application/generate-lead";
import RetrieveLeads from "../application/retrieve-leads";
import MongoLeadsRepository from "../infra/mongo-leads-repository";

const router = express.Router()
const repository = new MongoLeadsRepository();

router.get('/', (req, res) => {
  const useCase = new RetrieveLeads(repository);
  useCase
    .execute()
    .then(leads => res.send(leads));
});

router.post('/', function (req, res) {
  const useCase = new GenerateLead(repository);
  const result = useCase.execute({ fullName: req.body.fullName, email: req.body.email });

  res.send(result ? 'Foi' : 'Erro');
})

export default router