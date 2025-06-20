const db = require('../models/ConnectDatabase')

class EnderecoRepository {
    async findAll() {
        const rows = await db.query(
            `select  * from enderecos`
        )
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `select  * from enderecos where endereco_id = ?`, [id]
        )
        return row;
    }

    async findByName(cep) {
        const [rows] = await db.query(
            `select * from enderecos where cep = ?`, [cep]
        )
        return rows

    }

    async create({ cep, rua, bairro, cidade, estado }) {
        const result = await db.query(`insert into enderecos (cep, rua, bairro, cidade, estado) values (?,?,?,?,?)`,
            [cep, rua, bairro, cidade, estado])

        const insertedId = result.insertId
        return {
            endereco_id: insertedId,
            cep,
            rua,
            bairro,
            cidade,
            estado
        }
    }

    async update(id, { cep, rua, bairro, cidade, estado }) {
        const result = await db.query(
            ` update enderecos set cep = ?, rua = ?, bairro = ?, cidade = ?, estado = ? endereco_id = ?`,
            [cep, rua, bairro, cidade, estado, id]
        )
        return result;
    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from enderecos where endereco_id = ?`, [id]
        )
        return deleteItem

    }
}

module.exports = new EnderecoRepository();