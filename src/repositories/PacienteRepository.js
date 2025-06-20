const db = require('../models/ConnectDatabase')

class PacienteRepository {

    async findAll() {
        const rows = await db.query(
            `
            SELECT 
                    nome, cpf, data_nascimento, sexo, telefone, email
                FROM pacientes
            `
        )
        return rows;

    }
    async findById(id) {
        const [row] = await db.query(
            `
            SELECT 
                    nome, cpf, data_nascimento, sexo, telefone, email
                FROM pacientes where = ?`, [id]
        )
        return row;
    }
    async findByCpf(cpf) {
        const [row] = await db.query(
            `select  * from pacientes where cpf = ?`, [cpf]
        )

        return row;
    }

    async findByEmail(email) {
        const [row] = await db.query(
            `select  * from pacientes where email = ?`, [email]
        )

        return row;
    }

    async create({ nome, cpf, data_nascimento, sexo, telefone, email, endereco_id }) {
        const result = await db.query(`insert into pacientes ( nome, cpf, data_nascimento, sexo, telefone, email, endereco_id)
                        values (?,?,?,?,?,?,?)`,
            [nome, cpf, data_nascimento, sexo, telefone, email, endereco_id])

        const insertedId = result.insertId
        return {
            paciente_id: insertedId,
            nome,
            cpf,
            data_nascimento,
            sexo,
            telefone,
            email,
            endereco_id

        }
    }

    async update(id, { nome, cpf, data_nascimento, sexo, telefone, email, endereco_id }) {
        const result = await db.query(
            ` update pacientes set nome = ?, cpf = ?, data_nascimento = ?, sexo = ?, email = ?, telefone = ?, endereco_id = ? where paciente_id = ?`,
            [nome, cpf, data_nascimento, sexo, telefone, email, endereco_id, id]
        )
        return result
    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from pacientes where paciente_id = ?`, [id]
        )
        return deleteItem
    }

}

module.exports = new PacienteRepository();