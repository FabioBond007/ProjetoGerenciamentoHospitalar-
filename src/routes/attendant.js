const{Router} = require("express");
const AtendimentoController = require("../controllers/AtendimentoController")
const PacienteRepository = require("../controllers/PacienteController")
const EnderecoController = require("../controllers/EnderecoController")
const routes = Router();

//ATENDIMENTO
routes.get("/atendimentos", AtendimentoController.index);
routes.get("/atendimentos/:id", AtendimentoController.show);
routes.post("/atendimentos", AtendimentoController.store);
routes.put("/atendimentos/:id", AtendimentoController.update);
routes.delete("/atendimentos/:id", AtendimentoController.destroy);

//PACIENTE
routes.get("/pacientes", PacienteRepository.index);
routes.get("/pacientes/:id", PacienteRepository.show);
routes.post("/pacientes", PacienteRepository.store);
routes.put("/pacientes/:id", PacienteRepository.update);
routes.delete("/pacientes/:id", PacienteRepository.destroy);

//ENDEREÇO
routes.get("/enderecos", EnderecoController.index);
routes.get("/enderecos/:id", EnderecoController.show);
routes.post("/enderecos", EnderecoController.store);
routes.put("/enderecos/:id", EnderecoController.update);
routes.delete("/enderecos/:id", EnderecoController.destroy);


module.exports = routes;