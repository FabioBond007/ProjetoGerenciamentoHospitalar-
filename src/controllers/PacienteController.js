const PacienteRepository = require("../repositories/PacienteRepository");

class PacienteController {

    async index(request, response) {
        const funcionarios = await PacienteRepository.findAll();
        response.status(201).json(funcionarios)
    }

    async show(request, response) {
        const { id } = request.params;
        const funcionario = await PacienteRepository.findById(id);
        if (!funcionario) {
            return response.status(404).json({ error: "Paciente não encontrado!" });
        }
        response.status(201).json(funcionario);
    }
    
    async store(request, response) {
        const { nome, cpf, data_nascimento, sexo, telefone, email, endereco_id } = request.body
        if (!nome || !cpf) {
            return response.status(400).json({ error: "Nome e CPF devem ser informados obrigatóriamente!!!" })
        }
        if (cpf) {
            const pacienteCpf = await PacienteRepository.findByCpf(cpf)
            if (pacienteCpf) {
                return response.status(400).json({ error: "Esse CPF já está em uso!" })
            }
        }
        if (email) {
            const pacienteEmail = await PacienteRepository.findByEmail(email)

            if (pacienteEmail) {
                return response.status(400).json({ error: "Esse email já está em uso!" })
            }
        }
        const paciente = await PacienteRepository.create({
            nome,
            cpf,
            email: email || null, //definindo como null se for ausente no body
            data_nascimento: data_nascimento || null,
            sexo: sexo || null,
            telefone: telefone || null,
            endereco_id: endereco_id || null
        })
        response.status(201).json(paciente)
    }

    async update(request, response) {

        const { id } = request.params
        const { nome, cpf, data_nascimento, sexo, telefone, email, endereco_id } = request.body
        const paciente = await PacienteRepository.findById(id)

        if (!paciente) {
            return response.status(404).json({ error: "Paciente não encontrado!" });
        }

        if (cpf) {
            const pacienteCpf = await PacienteRepository.findByCpf(cpf)
            if (pacienteCpf) {
                return response.status(400).json({ error: "Esse CPF já está em uso!" })
            }

            if (email) {
                const pacienteEmail = await PacienteRepository.findByEmail(email)

                if (pacienteEmail) {
                    return response.status(400).json({ error: "Esse email já está em uso!" })
                }
            }

            await PacienteRepository.update(id, {
                nome: nome ?? paciente.nome,
                email: email ?? paciente.email, //definindo como null se for ausente no body
                cpf: cpf ?? paciente.cpf,
                data_nascimento: data_nascimento ?? paciente.data_nascimento,
                sexo: sexo ?? paciente.sexo,
                telefone: telefone ?? paciente.telefone,
                endereco_id: endereco_id ?? paciente.endereco_id
            })
            const upadateContac = await PacienteRepository.findById(id)
            response.status(201).json(upadateContac)
        }
    }

    async destroy(request, response) {
        const { id } = request.params;
        const funcionario = await PacienteRepository.findById(id);

        if (!funcionario) {
            return response.status(400).json({ error: "ID do paciente inválido" })
        }
        await FuncionarioRepository.delete(id)

        response.sendStatus(204)
    }

}

module.exports = new PacienteController();