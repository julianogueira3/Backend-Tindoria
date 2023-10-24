const express = require('express');
const router = express.Router();

const disciplinasDB = []; // Banco de dados fictício para armazenar as disciplinas
let currentDisciplinaId = 1; // ID inicial para as disciplinas

// Função para gerar IDs únicos
function generateUniqueId() {
  return currentDisciplinaId++;
}

// Rota para cadastrar uma disciplina
router.post('/disciplina', (req, res) => {
  const { imagem, nome, descricao } = req.body;

  if (!imagem || !nome || !descricao) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  const novaDisciplina = {
    id: generateUniqueId(),
    imagem,
    nome,
    descricao,
  };

  disciplinasDB.push(novaDisciplina);

  return res.status(201).json(novaDisciplina);
});

// Rota para listar disciplinas
router.get('/disciplina', (req, res) => {
  return res.json(disciplinasDB);
});

// Rota para exibir detalhes de uma disciplina
router.get('/disciplina/:id', (req, res) => {
  const disciplinaId = req.params.id;
  const disciplina = disciplinasDB.find((d) => d.id == disciplinaId);

  if (!disciplina) {
    return res.status(404).json({ error: 'Disciplina não encontrada.' });
  }

  return res.json(disciplina);
});

// Rota para atualizar uma disciplina
router.put('/disciplina/:id', (req, res) => {
  const disciplinaId = req.params.id;
  const { nome, descricao } = req.body;

  const disciplinaIndex = disciplinasDB.findIndex((d) => d.id == disciplinaId);

  if (disciplinaIndex == -1) {
    return res.status(404).json({ error: 'Disciplina não encontrada.' });
  }

  if (nome) {
    disciplinasDB[disciplinaIndex].nome = nome;
  }

  if (descricao) {
    disciplinasDB[disciplinaIndex].descricao = descricao;
  }

  return res.json(disciplinasDB[disciplinaIndex]);
});

// Rota para deletar uma disciplina
router.delete('/disciplina/:id', (req, res) => {
  const disciplinaId = req.params.id;
  const disciplinaIndex = disciplinasDB.findIndex((d) => d.id == disciplinaId);

  if (disciplinaIndex == -1) {
    return res.status(404).json({ error: 'Disciplina não encontrada.' });
  }

  const disciplinaRemovida = disciplinasDB.splice(disciplinaIndex, 1);

  return res.json(disciplinaRemovida[0]);
});

// Rota para listar todas as disciplinas
router.get('/', (req, res) => {
    return res.json(disciplinasDB);
  });

module.exports = router;
