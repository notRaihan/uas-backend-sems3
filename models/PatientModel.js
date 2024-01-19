// import database
const db = require("../config/database");

// create class PatientsModel
class PatientsModel {
    // method get all patients
    all() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM patients", (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    // method get patient by id
    find(id) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM patients WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0]);
                    }
                }
            );
        });
    }

    // method create patient
    create(data) {
        // convert to date format
        let inDate = data.in_date_at.split("-");
        data.in_date_at = `${inDate[2]}-${inDate[1]}-${inDate[0]}`;
        data.in_date_at = new Date(data.in_date_at);

        let outDate = data.out_date_at.split("-");
        data.out_date_at = `${outDate[2]}-${outDate[1]}-${outDate[0]}`;
        data.out_date_at = new Date(data.out_date_at);

        return new Promise((resolve, reject) => {
            db.query("INSERT INTO patients SET ?", data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // method update patient
    update(id, data) {
        // convert to date format
        let inDate = data.in_date_at.split("-");
        data.in_date_at = `${inDate[2]}-${inDate[1]}-${inDate[0]}`;
        data.in_date_at = new Date(data.in_date_at);

        let outDate = data.out_date_at.split("-");
        data.out_date_at = `${outDate[2]}-${outDate[1]}-${outDate[0]}`;
        data.out_date_at = new Date(data.out_date_at);

        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE patients SET ? WHERE id = ?",
                [data, id],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                }
            );
        });
    }

    // method delete patient
    delete(id) {
        return new Promise((resolve, reject) => {
            db.query(
                "DELETE FROM patients WHERE id = ?",
                [id],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    // method search patient by name
    search(name) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM patients WHERE name LIKE ?",
                [`%${name}%`],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }

    // method search patient by status
    findByStatus(status) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT * FROM patients WHERE status = ?",
                [status],
                (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                }
            );
        });
    }
}

// export class PatientsModel
module.exports = new PatientsModel();
