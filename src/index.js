const express = require("express");
const db = require("./models/ConnectDatabase");
const routes = require('./routes/routes');
const adminRoutes = require('./routes/admin');
const medicoRoutes = require('./routes/doctor');
const atendenteRoutes = require('./routes/attendant');

const app = express();
const port = 3000;

// Conexão com o banco de dados
db.testConnection().catch((err) => {
  console.error(
    "Não foi possível conectar ao banco de dados. Encerrando o aplicativo."
  );
  process.exit(1);
});

app.use(express.json());
app.use('/admin', adminRoutes);       // localhost:3000/admin/alguma-coisa
app.use('/medico', medicoRoutes);     // localhost:3000/medico/alguma-coisa
app.use('/atendente', atendenteRoutes); // localhost:3000/atendente/alguma-coisa

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
