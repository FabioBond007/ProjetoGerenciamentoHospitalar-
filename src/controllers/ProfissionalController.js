const ProfissionalRepository = require("../repositories/ProfissionalRepository")

class ProfissionalController {

    async index(request, response) {
        const profissinonais = await ProfissionalRepository.findAll();
        response.status(201).json(profissinonais)

    }

    async show(request, response) {
        const { id } = request.params;
        const profissional = await ProfissionalRepository.findById(id);
        if (!profissional) {
            return response.status(404).json({ error: "Profissional não encontrado!" });
        }
        response.status(201).json(profissional);
    }
    
    async store(request, response) {
        const { crm, dias_semana, funcionario_id } = request.body
        if (!crm || !dias_semana || funcionario_id) {
            return response.status(400).json({ error: "CRM e Dias da semana e ID do funcionario devem ser informados obrigatóriamente!!!" })
        }
        if (crm) {
            const profissionalCrm = await ProfissionalRepository.findByCrm(crm)
            if (profissionalCrm) {
                return response.status(400).json({ error: "Esse CRM já está em uso!" })
            }
        }
        
        const profissional = await ProfissionalRepository.create({
            crm,
            dias_semana,
            funcionario_id
        })
        response.status(201).json(profissional)
    }

    async update(request, response) {
         const { id } = request.params
                const { crm, dias_semana, funcionario_id } = request.body
                const profissional = await ProfissionalRepository.findById(id)
        
                if (!profissional) {
                    return response.status(404).json({ error: "Profissional não encontrado!" });
                }
        
                if (crm) {
                    const profissionalCrm = await ProfissionalRepository.findByCrm(crm)
                    if (profissionalCrm) {
                        return response.status(400).json({ error: "Esse CRM já está em uso!" })
                    }
        
        
                    await ProfissionalRepository.update(id, {
                        crm: crm ?? profissional.crm,
                        dias_semana: dias_semana ?? profissional.dias_semana, //definindo como null se for ausente no body
                        funcionario_id: funcionario_id ?? profissional.funcionario_id
                    })
                    const upadateContac = await ProfissionalRepository.findById(id)
                    response.status(201).json(upadateContac)
            
                }
    }

    async destroy(request, response) {
        const { id } = request.params;
                const profissional = await ProfissionalRepository.findById(id);
                
                if (!profissional) {
                    return response.status(400).json({ error: "ID do funcionario inválido" })
                }
                await ProfissionalRepository.delete(id)
        
                response.sendStatus(204)
    }

}

module.exports = new ProfissionalController();