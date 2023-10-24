const express = require('express');
const router = express.Router();

const alunosDB = [
  {
    id: '1',
    nome: 'Nome do Aluno 1',
    descricao: 'Uma breve descrição do Aluno 1.',
    semestre: '3º semestre',
  },
  {
    id: '2',
    nome: 'Nome do Aluno 2',
    descricao: 'Descrição do Aluno 2.',
    semestre: '2º semestre',
  },
];

router.post('/cadastrar-aluno', (req, res) => {
    
    const { nome, email, senha, confirmacaoSenha } = req.body;
  
    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!nome || !email || !senha || !confirmacaoSenha) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    }
  
    //Verifica se a senha e a confirmação de senha são iguais
    if (senha !== confirmacaoSenha) {
      return res.status(400).json({ error: 'A senha e a confirmação de senha não coincidem.' });
    }
  
    //Verifica se o aluno já existe com base no email
    const alunoExistente = alunosDB.find((aluno) => aluno.email === email);
    if (alunoExistente) {
      return res.status(400).json({ error: 'Este email já está em uso.' });
    }
  
    const novoAluno = { nome, email, senha };
  

    alunosDB.push(novoAluno);
  
    return res.status(201).json({ message: 'Aluno cadastrado com sucesso.' });
  });
  

  
  // Rota para obter detalhes de um aluno
  router.get('/:id', (req, res) => {
    const alunoId = req.params.id; // Obtém o ID do aluno a partir dos parâmetros da rota
  
    // Realize a lógica para buscar os detalhes do aluno com o ID fornecido no banco de dados (ou onde os detalhes estão armazenados).
    const aluno = alunosDB.find((aluno) => aluno.id === alunoId);
  
    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
  
    // Suponha que os detalhes do aluno incluam um campo de descrição e um campo de semestre.
    const detalhesAluno = {
      descricao: aluno.descricao,
      semestre: aluno.semestre,
    };
  
    // Retorne os detalhes do aluno como resposta.
    return res.json(detalhesAluno);
  });


// Rota para atualizar parcialmente um aluno
router.patch('/:id', (req, res) => {
  const alunoId = req.params.id;
  const { nome, descricao, semestre } = req.body; // Recebe apenas os campos que precisam ser atualizados.

  // Implemente a lógica para atualizar parcialmente os detalhes do aluno com o ID fornecido.
  const alunoIndex = alunosDB.findIndex((aluno) => aluno.id === alunoId);

  if (alunoIndex === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  if (nome) {
    alunosDB[alunoIndex].nome = nome;
  }

  if (descricao) {
    alunosDB[alunoIndex].descricao = descricao;
  }

  if (semestre) {
    alunosDB[alunoIndex].semestre = semestre;
  }

  return res.json(alunosDB[alunoIndex]);
});

// Rota para atualizar um aluno
router.put('/:id', (req, res) => {
  const alunoId = req.params.id;
  const { nome, descricao, semestre } = req.body; // Supondo que você deseja atualizar nome, descrição e semestre.

  // Implemente a lógica para atualizar os detalhes do aluno com o ID fornecido.
  const alunoIndex = alunosDB.findIndex((aluno) => aluno.id === alunoId);

  if (alunoIndex === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  alunosDB[alunoIndex] = {
    ...alunosDB[alunoIndex],
    nome,
    descricao,
    semestre,
  };

  return res.json(alunosDB[alunoIndex]);
});


// Rota para deletar um aluno
router.delete('/:id', (req, res) => {
  const alunoId = req.params.id;
  const alunoIndex = alunosDB.findIndex((aluno) => aluno.id === alunoId);

  if (alunoIndex === -1) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }

  const alunoRemovido = alunosDB.splice(alunoIndex, 1);

  return res.json(alunoRemovido[0]);
});

// Rota para listar todos os alunos
router.get('/', (req, res) => {
  return res.json(alunosDB);
});
  
  module.exports = router;


  