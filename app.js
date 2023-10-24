const express = require('express');
const app = express();

app.use(express.json());

// Importe suas rotas
const alunoRoutes = require('./src/routes/alunoRoutes');
const disciplinaRoutes = require('./src/routes/disciplinaRoutes');
const filtroRoutes = require('./src/routes/filtroRoutes');
const tutorRoutes = require('./src/routes/tutorRoutes');

// Aplica as rotas de aluno em /aluno
app.use('/aluno', alunoRoutes);

// Aplica as rotas de disciplina em /disciplina
app.use('/disciplina', disciplinaRoutes);

// Aplica as rotas de filtro em /filtro
app.use('/filtro', filtroRoutes);

// Aplica as rotas de tutor em /tutor
app.use('/tutor', tutorRoutes);

// Outras configurações e rotas

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
