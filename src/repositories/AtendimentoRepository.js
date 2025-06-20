const db = require('../models/ConnectDatabase')

class AtendimentoRepository {

    async findAll() {
        const rows = await db.query(
            `select  * from atendimentos`
        )
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `select  * from atendimentos where atendimento_id = ?`, [id]
        )
        return row;
    }

    async create({ paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento, diagnostico, prescricao }) {
        const result = await db.query(`insert into atendimentos (paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta,tipo_atendimento, diagnostico, prescricao) values (?,?,?,?,?,?,?,?)`,
            [paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento, diagnostico, prescricao])

        const insertedId = result.insertId
        return {
            atendimento_id: insertedId,
            paciente_id,
            profissional_id,
            funcionario_id,
            data_do_agendamento,
            data_consulta,
            tipo_atendimento,
            diagnostico,
            prescricao
        }
    }

    async update(id, { paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento, diagnostico, prescricao }) {
        const result = await db.query(
            ` update atendimentos set paciente_id = ?, profissional_id = ?, funcionario_id = ?, data_do_agendamento = ?, data_consulta = ?,tipo_atendimento = ?, diagnostico = ?,prescricao=? atendimento_id = ?`,
            [paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento,diagnostico, prescricao, id]
        )
        return result;
    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from atendimentos where atendimento_id = ?`, [id]
        )
        return deleteItem

    }

}

module.exports = new AtendimentoRepository();
