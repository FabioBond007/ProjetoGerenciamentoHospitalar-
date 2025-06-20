const FuncionarioRepository = require("../repositories/FuncionarioRepository")

class FuncionarioController {

    async index(request, response) {
        const funcionarios = await FuncionarioRepository.findAll();
        response.status(201).json(funcionarios)
    }

    async show(request, response) {
        const { id } = request.params;
        const funcionario = await FuncionarioRepository.findById(id);
        if (!funcionario) {
            return response.status(404).json({ error: "Funcionario não encontrado!" });
        }
        response.status(201).json(funcionario);

    }

    async store(request, response) {
        const { nome, cpf, email, funcao, endereco_id } = request.body
        if (!nome || !cpf) {
            return response.status(400).json({ error: "Nome e CPF devem ser informados obrigatóriamente!!!" })
        }
        if (cpf) {
            const funcionarioCpf = await FuncionarioRepository.findByCpf(cpf)
            if (funcionarioCpf) {
                return response.status(400).json({ error: "Esse CPF já está em uso!" })
            }
        }
        if (email) {
            const funcionarioEmail = await FuncionarioRepository.findByEmail(email)

            if (funcionarioEmail) {
                return response.status(400).json({ error: "Esse email já está em uso!" })
            }
        }
        const funcionario = await FuncionarioRepository.create({
            nome,
            cpf,
            email: email || null, //definindo como null se for ausente no body
            funcao: funcao || null,
            endereco_id: endereco_id || null
        })
        response.status(201).json(funcionario)
    }

    async update(request, response) {
        const { id } = request.params
        const { nome, cpf, email, funcao, endereco_id } = request.body
        const funcionario = await FuncionarioRepository.findById(id)

        if (!funcionario) {
            return response.status(404).json({ error: "Funcionario não encontrado!" });
        }

        if (cpf) {
            const funcionarioCpf = await FuncionarioRepository.findByCpf(cpf)
            if (funcionarioCpf) {
                return response.status(400).json({ error: "Esse CPF já está em uso!" })
            }

            if (email) {
                const funcionarioEmail = await FuncionarioRepository.findByEmail(email)

                if (funcionarioEmail) {
                    return response.status(400).json({ error: "Esse email já está em uso!" })
                }
            }

            await FuncionarioRepository.update(id, {
                nome: nome ?? funcionario.nome,
                email: email ?? funcionario.email, //definindo como null se for ausente no body
                cpf: cpf ?? funcionario.cpf,
                funcao: funcao ?? funcionario.funcao,
                endereco_id: endereco_id ?? funcionario.endereco_id
            })
            const upadateContac = await FuncionarioRepository.findById(id)
            response.status(201).json(upadateContac)
    
        }
    }

    async destroy(request, response) {
        const { id } = request.params;
        const funcionario = await FuncionarioRepository.findById(id);
        
        if (!funcionario) {
            return response.status(400).json({ error: "ID do funcionario inválido" })
        }
        await FuncionarioRepository.delete(id)

        response.sendStatus(204)
    }
}

module.exports = new FuncionarioController();