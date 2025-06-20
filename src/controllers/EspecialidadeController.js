const EspecialidadeRepository = require("../repositories/EspecialidadeRepository")

class EspecialidadeController {

    async index(request, response) {
        const especialidade = await EspecialidadeRepository.findAll();
        response.status(201).json(especialidade)
    }

    async show(request, response) {
        const { id } = request.params;
        const especialidade = await EspecialidadeRepository.findById(id);
        if (!especialidade) {
            return response.status(404).json({ error: "Especialidade não encontrado!" });
        }
        response.status(201).json(especialidade);
    }

    async store(request, response) {
        const { nome, rqe, descricao } = request.body
        if (!nome || !rqe) {
            return response.status(400).json({ error: "Nome e RQE devem ser informados obrigatóriamente!!!" })
        }
        if (nome) {
            const especialidaeNome = await EspecialidadeRepository.findByName(nome)
            if (especialidaeNome) {
                return response.status(400).json({ error: "Esse Nome já está em uso!" })
            }
        }

        const especialidade = await EspecialidadeRepository.create({
            nome,
            rqe,
            descricao: descricao || null //definindo como null se for ausente no body

        })
        response.status(201).json(funcionario)
    }

    async update(request, response) {
        const { id } = request.params
        const { nome, rqe, descricao } = request.body
        const especialidade = await EspecialidadeRepository.findById(id)

        if (!especialidade) {
            return response.status(404).json({ error: "Funcionario não encontrado!" });
        }

        if (nome) {
            const especialidadeNome = await EspecialidadeRepository.findByCpf(nome)
            if (especialidadeNome) {
                return response.status(400).json({ error: "Esse Nome já está em uso!" })
            }


            await EspecialidadeRepository.update(id, {
                nome: nome ?? especialidade.nome,
                rqe: rqe ?? especialidade.rqe, //definindo como null se for ausente no body
                descricao: descricao ?? especialidade.descricao,

            })
            const upadateContac = await EspecialidadeRepository.findById(id)
            response.status(201).json(upadateContac)
        }
    }

    async destroy(request, response) {
        const { id } = request.params;
        const funcionario = await EspecialidadeRepository.findById(id);

        if (!funcionario) {
            return response.status(400).json({ error: "ID da Especialidade inválido" })
        }
        await EspecialidadeRepository.delete(id)

        response.sendStatus(204)
    }

}

module.exports = new EspecialidadeController();