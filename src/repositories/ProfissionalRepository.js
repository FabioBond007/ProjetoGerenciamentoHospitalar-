const db = require('../models/ConnectDatabase')

class ProfissionalRepository {

    async findAll() {
        const rows = await db.query(
        `SELECT 
            funcionarios.nome AS funcionario_nome,
            profissionais.crm, profissionais.dias_semana, 
            especialidades.nome AS especialidade_nome,
            especialidades_profissionais.rqe
        FROM profissionais
        LEFT JOIN funcionarios 
            ON funcionarios.funcionario_id = profissionais.funcionario_id
        LEFT JOIN especialidades_profissionais 
            ON especialidades_profissionais.profissional_id = profissionais.profissional_id
        LEFT JOIN especialidades 
            ON especialidades.especialidade_id = especialidades_profissionais.especialidade_id;
    `
        )
        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `SELECT 
            funcionarios.nome AS funcionario_nome,
            profissionais.crm, profissionais.dias_semana, 
            especialidades.nome AS especialidade_nome,
            especialidades_profissionais.rqe
        FROM profissionais
        LEFT JOIN funcionarios 
            ON funcionarios.funcionario_id = profissionais.funcionario_id
        LEFT JOIN especialidades_profissionais 
            ON especialidades_profissionais.profissional_id = profissionais.profissional_id
        LEFT JOIN especialidades 
            ON especialidades.especialidade_id = especialidades_profissionais.especialidade_id where profissional_id = ?`, [id]
        )
        return row;
    }
    
    async findByCrm(crm) {
        const [row] = await db.query(
            `select  * from profissionais where crm = ?`, [crm]
        )

        return row;
    }

    async create({crm, dias_atendimento, funcionario_id }) {

        const result = await db.query(`insert into profissionais ( crm, dias_atendimento, funcionario_id)
            values (?,?,?)`,
            [crm, dias_atendimento, funcionario_id])

        const insertedId = result.insertId
        return {
            profissional_id: insertedId,
            crm,
            dias_atendimento,
            funcionario_id

        }
    }

    async update(profissional_id, {crm, dias_atendimento, funcionario_id}) { 
        const result = await db.query(
        ` update profissionais set crm = ?, dias_atendimento = ?, funcionario_id = ? where profissional_id = ?`,
        [crm, dias_atendimento, funcionario_id, profissional_id]
    )
    return result

    }

    async delete(profissional_id) {
        const deleteItem = await db.query(
            `delete from profissionais where id = ?`, [profissional_id]
        )
        return deleteItem
    }

}

module.exports = new ProfissionalRepository();