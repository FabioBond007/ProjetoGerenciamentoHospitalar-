const{Router} = require("express");
const FuncionarioController = require("../controllers/FuncionarioController")
const EspecialidaeController = require("../controllers/EspecialidadeController")
const ProfissionalController = require("../controllers/ProfissionalController")
const EnderecoController = require("../controllers/EnderecoController")
const routes = Router();


/*const ContactController = require("./controllers/ContactController")
const CategoryController = require("./controllers/CategoryController")*/

//FUNCIONARIOS
routes.get("/funcionarios", FuncionarioController.index);
routes.get("/funcionarios/:id", FuncionarioController.show);
routes.post("/funcionarios", FuncionarioController.store);
routes.put("/funcionarios/:id", FuncionarioController.update);
routes.delete("/funcionarios/:id", FuncionarioController.destroy);

//ESPECIALIDADES
routes.get("/especialidades", EspecialidaeController.index);
routes.get("/especialidades/:id", EspecialidaeController.show);
routes.post("/especialidades", EspecialidaeController.store);
routes.put("/especialidades/:id", EspecialidaeController.update);
routes.delete("/especialidades/:id", EspecialidaeController.destroy);

//PROFISSIONAIS
routes.get("/profissionais", ProfissionalController.index);
routes.get("/profissionais/:id", ProfissionalController.show);
routes.post("/profissionais", ProfissionalController.store);
routes.put("/profissionais/:id", ProfissionalController.update);
routes.delete("/profissionais/:id", ProfissionalController.destroy);

//ENDEREÇO
routes.get("/enderecos", EnderecoController.index);
routes.get("/enderecos/:id", EnderecoController.show);
routes.post("/enderecos", EnderecoController.store);
routes.put("/enderecos/:id", EnderecoController.update);
routes.delete("/enderecos/:id", EnderecoController.destroy);


module.exports = routes;