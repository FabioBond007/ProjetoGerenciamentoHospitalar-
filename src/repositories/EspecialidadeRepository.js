const db = require('../models/ConnectDatabase')

class EspecialidadeRepository {

    async findAll() {
        const rows = await db.query(
            `select  * from especialidades`
        )
        return rows;
    }

    async findById(id) { 
        const [row] = await db.query(
            `select  * from especialidades where especialidade_id = ?`, [id]
        )
        return row;
    }
    async findByName(name){
        const [rows] = await db.query(
            `select * from especialidades where name = ?`, [name]
        )
        return rows

    }

    async create({name, rqe, descricao}) { 
        const result = await db.query(`insert into especialidades (name, rqe, descricao) values (?,?,?)`,
            [name, rqe, descricao])

        const insertedId = result.insertId
        return {
            id: insertedId,
            name,
            rqe,
            descricao
        }
    }

    async update(id, {name, rqe, descricao}) {
        const result = await db.query(
        ` update especialidades set name = ?, rqe = ?, descricao = ? where especialidade_id = ?`,
        [name, rqe, descricao, id]
    )
    return result
        
    }

    async delete(id) {
        const deleteItem = await db.query(
            `delete from especialidades where especialidade_id = ?`, [id]
        )
        return deleteItem
     }
}

module.exports = new EspecialidadeRepository();