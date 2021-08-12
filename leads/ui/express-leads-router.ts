import express from "express";
import GenerateLead from "../application/generate-lead";
import RetrieveLeadByEmail from "../application/retrieve-lead-by-email";
import RetrieveLeads from "../application/retrieve-leads";
import MongooseLeadsRepository from "../infra/mongoose-leads-repository";

export default (repository: MongooseLeadsRepository) => {
  const router = express.Router()

  router.get('/', (req, res) => {
    const useCase = new RetrieveLeads(repository);
    useCase
        .execute()
        .then(leads => res.send(leads));
  });

  router.get('/:email', (req, res) => {
    const useCase = new RetrieveLeadByEmail(repository);
    useCase.execute(req.params.email)
        .then(lead => {
          if (lead === null) {
            res.status(404).send('Lead not found');
            return;
          }

          res.send(lead);
        });
  });

  router.post('/', function (req, res) {
    const useCase = new GenerateLead(repository);
    const result = useCase.execute({fullName: req.body.fullName, email: req.body.email});

    if (!result) {
      res.status(500).send('Something unexpected happened. We are working on it.')
      return;
    }

    res
        .status(201)
        .send('Lead created successfully');
  });

  return router;
};
