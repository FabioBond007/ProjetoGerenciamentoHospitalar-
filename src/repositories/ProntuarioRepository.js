const db = require('../models/ConnectDatabase')

class ProntuarioRepository {

    async findAll() {
        const rows = await db.query(
            `SELECT * FROM prontuarios`
        )
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `SELECT * FROM prontuarios where profissional_id = ?`, [id]
        )
        return row;
    }

    async create({ paciente_id, historico_doencas, alergias, observacoes_gerais, data_ultima_atualizacao }) {

        const result = await db.query(`insert into prontuarios (paciente_id, historico_doencas, alergias, observacoes_gerais, data_ultima_atualizacao)
                values (?,?,?,?,?)`,
            [paciente_id, historico_doencas, alergias, observacoes_gerais, data_ultima_atualizacao])

        const insertedId = result.insertId
        return {

            prontuario_id: insertedId,
            paciente_id,
            historico_doencas,
            alergias,
            observacoes_gerais,
            data_ultima_atualizacao

        }
    }

    async update(id, { paciente_id, historico_doencas, alergias, observacoes_gerais, data_ultima_atualizacao }) {
        const result = await db.query(
            ` update prontuarios set paciente_id = ?, historico_doencas = ?, alergias = ?, observacoes_gerais = ?, data_ultima_atualizacao = ? where prontuario_id = ?`,
            [paciente_id, historico_doencas, alergias, observacoes_gerais, data_ultima_atualizacao, id]
        )
        return result

    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from prontuarios where prontuario_id = ?`, [id]
        )
        return deleteItem
    }

}

module.exports = new ProntuarioRepository();