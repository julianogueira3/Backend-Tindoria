const express = require('express');
const router = express.Router();
const multer = require('multer');

const tutoresDB = [
  {
    id: '1',
    nome: 'Nome do Tutor 1',
    descricao: 'Uma breve descrição do Tutor 1.',
    disciplina: 'Matemática',
  },
  {
    id: '2',
    nome: 'Nome do Tutor 2',
    descricao: 'Descrição do Tutor 2.',
    disciplina: 'Física',
  },
];

// Configurar o middleware Multer para fazer o upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // O diretório onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Nome do arquivo original
  },
});
const upload = multer({ storage: storage });

// Rota para cadastrar um tutor com upload de arquivo
router.post('/cadastrar-tutor', upload.single('arquivo'), (req, res) => {
  const arquivo = req.file; // O arquivo enviado pelo tutor
  const { nome, email, senha, confirmacaoSenha, disciplina } = req.body;

  if (!nome || !email || !senha || !confirmacaoSenha || !disciplina) {
    return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
  }

  if (senha !== confirmacaoSenha) {
    return res.status(400).json({ error: 'A senha e a confirmação de senha não coincidem.' });
  }

  const tutorExistente = tutoresDB.find((tutor) => tutor.email === email);
  if (tutorExistente) {
    return res.status(400).json({ error: 'Este email já está em uso.' });
  }

  // Aqui, você pode salvar o arquivo no banco de dados associado ao tutor
  // Exemplo: MongoDB
  tutoresDB.push({
    nome,
    email,
    senha,
    disciplina,
    arquivo: arquivo.buffer, // Armazena o conteúdo do arquivo no banco de dados
  });

  return res.status(201).json({ message: 'Tutor cadastrado com sucesso.' });
});


// Rota para obter detalhes de um tutor
router.get('/:id', (req, res) => {
  const tutorId = req.params.id;
  const tutor = tutoresDB.find((tutor) => tutor.id === tutorId);

  if (!tutor) {
    return res.status(404).json({ erro: 'Tutor não encontrado' });
  }

  const detalhesTutor = {
    descricao: tutor.descricao,
    disciplina: tutor.disciplina,
  };

  return res.json(detalhesTutor);
});

// Rota para atualizar parcialmente um tutor
router.patch('/:id', (req, res) => {
  const tutorId = req.params.id;
  const { nome, descricao, disciplina } = req.body;

  const tutorIndex = tutoresDB.findIndex((tutor) => tutor.id === tutorId);

  if (tutorIndex === -1) {
    return res.status(404).json({ erro: 'Tutor não encontrado' });
  }

  if (nome) {
    tutoresDB[tutorIndex].nome = nome;
  }

  if (descricao) {
    tutoresDB[tutorIndex].descricao = descricao;
  }

  if (disciplina) {
    tutoresDB[tutorIndex].disciplina = disciplina;
  }

  return res.json(tutoresDB[tutorIndex]);
});

// Rota para atualizar um tutor
router.put('/:id', (req, res) => {
  const tutorId = req.params.id;
  const { nome, descricao, disciplina } = req.body;

  const tutorIndex = tutoresDB.findIndex((tutor) => tutor.id === tutorId);

  if (tutorIndex === -1) {
    return res.status(404).json({ erro: 'Tutor não encontrado' });
  }

  tutoresDB[tutorIndex] = {
    ...tutoresDB[tutorIndex],
    nome,
    descricao,
    disciplina,
  };

  return res.json(tutoresDB[tutorIndex]);
});

// Rota para deletar um tutor
router.delete('/:id', (req, res) => {
  const tutorId = req.params.id;
  const tutorIndex = tutoresDB.findIndex((tutor) => tutor.id === tutorId);

  if (tutorIndex === -1) {
    return res.status(404).json({ erro: 'Tutor não encontrado' });
  }

  const tutorRemovido = tutoresDB.splice(tutorIndex, 1);

  return res.json(tutorRemovido[0]);
});


// Rota para exibir avaliações do tutor
router.get('/:tutorId/ratings', (req, res) => {
  const { tutorId } = req.params;
  const tutor = db.tutores.find((tutor) => tutor.id == tutorId);

  if (!tutor) {
    return res.status(404).json({ error: 'Tutor não encontrado.' });
  }

  const avaliacoes = tutor.avaliacoes;
  return res.json(avaliacoes);
});

// Rota para avaliar um tutor
router.post('/:tutorId/ratings', (req, res) => {
  const { tutorId } = req.params;
  const { classificacao, comentario } = req.body;
  const tutor = db.tutores.find((tutor) => tutor.id == tutorId);

  if (!tutor) {
    return res.status(404).json({ error: 'Tutor não encontrado.' });
  }

  if (!classificacao || classificacao < 1 || classificacao > 5) {
    return res.status(400).json({ error: 'Classificação inválida. Deve estar entre 1 e 5.' });
  }

  const novaAvaliacao = { classificacao, comentario };
  tutor.avaliacoes.push(novaAvaliacao);

  return res.status(201).json({ message: 'Avaliação registrada com sucesso.' });
});

// Rota para visualizar o histórico de avaliações de um tutor
router.get('/:id/ratings/history', (req, res) => {
    const tutorId = req.params.id;
  
    // Implemente a lógica para buscar o histórico de avaliações do tutor com o ID fornecido.
    // Suponha que cada tutor tenha um array de avaliações (substitua com seus dados reais).
    const tutor = tutoresDB.find((tutor) => tutor.id == tutorId);
  
    if (!tutor) {
      return res.status(404).json({ erro: 'Tutor não encontrado.' });
    }
  
    const historicoAvaliacoes = tutor.avaliacoes || []; // Substitua com seus dados reais.
  
    return res.json(historicoAvaliacoes);
  });
  
  module.exports = router;
  

// Rota para listar todos os tutores
router.get('/', (req, res) => {
    return res.json(tutoresDB);
  });

module.exports = router;
