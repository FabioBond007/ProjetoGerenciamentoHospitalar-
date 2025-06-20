const ProntuarioRepository = require("../repositories/ProntuarioRepository")

class ProntuarioController {

    async index(request, response) {
        const prontuario = await ProntuarioRepository.findAll()
        response.status(201).json(prontuario);
    }

    async show(request, response) {
        const { id } = request.params;
        const prontuario = await ProntuarioRepository.findById(id);
        if (!prontuario) {
            return response.status(404).json({ error: "Prontuario não encontado!" });
        }
        response.status(201).json(prontuario);
    }

    async store(request, response) {
        const { paciente_id, historico_doencas, alergias, observacoes_gerais } = request.body
        if (!paciente_id) {
            return response.status(400).json({ error: "O ID do paciente nao pode ser vazio!" })
        }

        const prontuario = await ProntuarioRepository.create({
            paciente_id,
            historico_doencas: historico_doencas || null,
            alergias: alergias || null,
            observacoes_gerais: observacoes_gerais || null,
            data_ultima_atualizacao: new Date()
        })
        response.status(201).json(prontuario)
    }

    async update(request, response) {
        const { id } = request.params;
        const prontuario = await ProntuarioRepository.findById(id);
        if (!prontuario) {
            return response.status(404).json({ error: "Prontuario não encontado!" });
        }
    }

    async destroy(request, response) {
        const { id } = request.params;
        const prontuario = await ProntuarioRepository.findById(id);
        if (!prontuario) {
            return response.status(404).json({ error: "Prontuario não encontado!" });
        }
        await ProntuarioRepository.delete(id)

        response.sendStatus(204)
    }


}

module.exports = new ProntuarioController();