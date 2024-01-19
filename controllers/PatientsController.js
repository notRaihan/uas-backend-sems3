// import model patient
const Patient = require("../models/PatientModel");

// import json response class
const JsonResponse = require("../models/JsonResponse");

// create class PatientsController
class PatientsController {
    // method get all patients
    async index(req, res) {
        // json response
        const response = new JsonResponse();
        const patients = await Patient.all();

        try {
            // check if patients is empty or not
            if (patients.length > 0) {
                res.status(200).json(
                    response.set(200, "success get all patients", patients)
                );
            } else {
                res.status(404).json(response.set(404, "patients not found"));
            }
        } catch (err) {
            res.status(404).json(
                response.set(200, "success get all patients", patients)
            );
        }
    }

    // method get patient by id
    async show(req, res) {
        // json response
        const response = new JsonResponse();
        const patient = await Patient.find(req.params.id);

        try {
            // check if patient is exist or not
            if (patient) {
                res.status(200).json(
                    response.set(200, "success get patient by id", patient)
                );
            } else {
                res.status(404).json(
                    response.set(404, "patient not found", patient)
                );
            }
        } catch (err) {
            res.status(500).json(500, "internal server error", err);
            console.log(err);
        }
    }

    // method create patient
    async store(req, res) {
        // json response
        const response = new JsonResponse();

        try {
            const patient = await Patient.create(req.body);

            res.status(201).json(
                response.set(201, "success create patient", patient)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.sqlMessage));
            console.log(err);
        }
    }

    // method update patient
    async update(req, res) {
        // json response
        const response = new JsonResponse();

        // check if patient is exist or not
        const patient = await Patient.find(req.params.id);
        if (!patient) {
            return res.status(404).json(response.set(404, "patient not found"));
        }

        const data = {
            name: req.body["name"] || patient.name,
            address: req.body["address"] || patient.address,
            in_date_at: req.body["in_date_at"] || patient.in_date_at,
            out_date_at: req.body["out_date_at"] || patient.out_date_at,
            phone: req.body["phone"] || patient.phone,
            status: req.body["status"] || patient.status,
        };

        try {
            const patient = await Patient.update(req.params.id, data);

            res.status(200).json(
                response.set(200, "success update patient", patient)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // method delete patient
    async destroy(req, res) {
        // json response
        const response = new JsonResponse();

        // check if patient is exist or not
        const patient = await Patient.find(req.params.id);
        if (!patient) {
            return res.status(404).json(response.set(404, "patient not found"));
        }

        try {
            const patient = await Patient.delete(req.params.id);

            res.status(200).json(
                response.set(200, "success delete patient", patient)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // method search patient by name
    async search(req, res) {
        // json response
        const response = new JsonResponse();

        try {
            const patients = await Patient.search(req.params.name);

            res.status(200).json(
                response.set(200, "success search patient", patients)
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }

    // method get patient by status
    async status(req, res) {
        // json response
        const response = new JsonResponse();
        const status = req.params.status;

        // check if status is valid or not
        if (
            status !== "recovered" &&
            status !== "positive" &&
            status !== "dead"
        ) {
            return res.status(400).json(response.set(400, "invalid status"));
        }

        try {
            const patients = await Patient.findByStatus(status);

            res.status(200).json(
                response.set(
                    200,
                    `success get patient by status ${status}`,
                    patients
                )
            );
        } catch (err) {
            res.status(500).json(response.set(500, err.message));
            console.log(err);
        }
    }
}

// export PatientsController
module.exports = new PatientsController();
