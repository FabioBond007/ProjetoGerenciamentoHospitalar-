const db = require('../models/ConnectDatabase')

class FuncionarioRepository {

     async findAll() { 
        const rows = await db.query(
            `select  * from funcionarios`
        )

        return rows;
    }

    async findById(id) {
        const [row] = await db.query(
            `select  * from funcionarios where funcionario_id = ?`, [id]
            )

        return row;
     }

    async findByCpf(cpf) {
        const [row] = await db.query(
            `select  * from funcionarios where cpf = ?`, [cpf]
            )

        return row;
     }

     async findByEmail(email) {
        const [row] = await db.query(
            `select  * from funcionarios where email = ?`, [email]
            )

        return row;
     }

    async create({nome, cpf, email, funcao, endereco_id}) { 
        const result = await db.query(`insert into funcionarios ( nome, cpf, email, funcao, endereco_id)
                    values (?,?,?,?,?)`,
                    [nome, cpf, email, funcao, endereco_id])
        
                const insertedId = result.insertId
                return {
                    funcionario_id: insertedId,
                    nome,
                    cpf,
                    email,
                    funcao,
                    endereco_id
        
                }
    }

    async update(id, {nome, cpf, email, funcao, endereco_id}) {
        const result = await db.query(
                ` update funcionarios set nome = ?, cpf = ?, email = ?, funcao = ?, endereco_id = ? where funcionario_id = ?`,
                [nome, cpf, email, funcao, endereco_id, id]
            )
            return result
    }

    async delete(id) {
        const deleteItem = await db.query(
                    `delete from funcionarios where funcionario_id = ?`, [id]
                )
                return deleteItem
    }
}

module.exports = new FuncionarioRepository();