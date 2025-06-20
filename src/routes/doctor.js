const{Router} = require("express");
const AtendimentoController = require("../controllers/AtendimentoController")
const ProntuarioController = require("../controllers/ProntuarioController")
const routes = Router();

//ATENDIMENTO
routes.get("/atendimentos", AtendimentoController.index);
routes.get("/atendimentos/:id", AtendimentoController.show);
routes.post("/atendimentos", AtendimentoController.store);
routes.put("/atendimentos/:id", AtendimentoController.update);
routes.delete("/atendimentos/:id", AtendimentoController.destroy);

//PRONTUARIO
routes.get("/atendimentos", ProntuarioController.index);
routes.get("/atendimentos/:id", ProntuarioController.show);
routes.post("/atendimentos", ProntuarioController.store);
routes.put("/atendimentos/:id", ProntuarioController.update);
routes.delete("/atendimentos/:id", ProntuarioController.destroy);



module.exports = routes;