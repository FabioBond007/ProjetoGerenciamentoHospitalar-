const EnderecoRepository = require("../repositories/EnderecoRepository")
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

class EnderecoController {

    async index(request, response) {
        const enderecos = await EnderecoRepository.findAll()
        return response.json(enderecos);
    }

    async show(request, response) {
        const { id } = request.params;
        const endereco = await EnderecoRepository.findById(id)

        if (!endereco) {
            return response.status(404).json({ error: "Endereço não encontrado." })
        }

        return response.json(endereco)
    
    }

    async store(request, response) {
        const { cep } = request.body

        if (!cep) {
            return response.status(400).json({ error: "O CEP é obrigatório." })
        }

        try {
            // Busca no ViaCEP
            const viaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const data = await viaCepResponse.json();

            if (!data) {
                return response.status(404).json({ error: "CEP não encontrado no ViaCEP." })
            }

            const enderecoCriado = await EnderecoRepository.create({
                cep,
                rua: data.logradouro,
                bairro: data.bairro,
                cidade: data.localidade,
                estado: data.uf
            })

            return response.status(201).json(enderecoCriado);

        } catch (error) {
        
            return response.status(500).json({ error: "Erro ao buscar CEP ou salvar no banco." })
        }
    }
    

    async update(request, response) {
        const { id } = request.params;
        const { cep, rua, bairro, cidade, estado } = request.body;

        const endereco = await EnderecoRepository.findById(id);
        if (!endereco) {
            return response.status(404).json({ error: "Endereço não encontrado." })
        }

        await EnderecoRepository.update(id,{ 
            cep: cep ?? endereco.cep,
            rua: rua ?? endereco.rua,
            bairro: bairro ?? endereco.bairro,
            cidade: cidade ?? endereco.cidade,
            estado: estado ?? endereco.estado })
        return response.json({ message: "Endereço atualizado com sucesso." })
    }

    async destroy(request, response) {
         const { id } = request.params;

        const endereco = await EnderecoRepository.findById(id)
        if (!endereco) {
            return response.status(404).json({ error: "Endereço não encontrado." })
        }

        await EnderecoRepository.delete(id)
        return response.senSstatus(204)
    }

}

module.exports = new EnderecoController()