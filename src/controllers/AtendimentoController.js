const AtendimentoRepository = require("../repositories/AtendimentoRepository")

class AtendimentoController {

    async index(request, response) {
        const funcionarios = await AtendimentoRepository.findAll();
        response.status(201).json(funcionarios)
    }

    async show(request, response) {
        const { id } = request.params;
        const atendimento = await AtendimentoRepository.findById(id);
        if (!atendimento) {
            return response.status(404).json({ error: "Atendimento não encontrado!" });
        }
        response.status(201).json(atendimento);
    }
   
    async store(request, response) {
        const { paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento, diagnostico, prescricao } = request.body
        if (!paciente_id || !profissional_id || !funcionario_id) {
            return response.status(400).json({ error: "ID do paciente do Profissional e do funcionario são obrigatórios!!!" })
        }
        const atendimento = await AtendimentoRepository.create({
            paciente_id,
            profissional_id,
            funcionario_id,
            data_do_agendamento: data_do_agendamento || null,
            data_consulta: data_consulta || null,
            tipo_atendimento: tipo_atendimento || null,
            diagnostico: diagnostico || null,
            prescricao: prescricao || null
        })
        response.status(201).json(atendimento)
    }

    async update(request, response) {
        const { id } = request.params
        const { paciente_id, profissional_id, funcionario_id, data_do_agendamento, data_consulta, tipo_atendimento, diagnostico, prescricao } = request.body
        const atendimento = await AtendimentoRepository.findById(id)

        if (!atendimento) {
            return response.status(404).json({ error: "Atendimento não encontrado!" });
        }


        await AtendimentoRepository.update(id, {
            paciente_id: paciente_id ?? atendimento.paciente_id,
            profissional_id: profissional_id ?? atendimento.profissional_id, //definindo como null se for ausente no body
            funcionario_id: funcionario_id ?? atendimento.data_do_agendamento,
            data_do_agendamento: data_do_agendamento ?? atendimento.data_consulta,
            data_consulta: data_consulta ?? atendimento.endereco_id,
            tipo_atendimento: tipo_atendimento ?? atendimento.tipo_atendimento,
            diagnostico: diagnostico ?? atendimento.diagnostico,
            prescricao: prescricao ?? atendimento.prescricao

        })
        const upadateContac = await AtendimentoRepository.findById(id)
        response.status(201).json(upadateContac)
    }
    
    async destroy(request, response) {
        const { id } = request.params;
        const atendimento = await AtendimentoRepository.findById(id);

        if (!atendimento) {
            return response.status(400).json({ error: "ID do Atendimento inválido" })
        }
        await AtendimentoRepository.delete(id)

        response.sendStatus(204)
    }
}




module.exports = new AtendimentoController();