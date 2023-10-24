const express = require('express');
const router = express.Router();


router.get('/filtrar-usuarios', (req, res) => {
  const { tipoUsuario, preco, distancia, disciplina, consulta } = req.query;
  
  let usuariosFiltrados = [];
  if (tipoUsuario === 'aluno') {
    usuariosFiltrados = alunosDB;
  } else if (tipoUsuario === 'tutor') {
    usuariosFiltrados = tutoresDB;
  } else {
    return res.status(400).json({ erro: 'Tipo de usuário inválido' });
  }

  
  if (preco) {
    usuariosFiltrados = usuariosFiltrados.filter((usuario) => usuario.preco <= parseFloat(preco));
  }
  if (distancia) {
    usuariosFiltrados = usuariosFiltrados.filter((usuario) => usuario.distancia <= parseFloat(distancia));
  }
  if (disciplina) {
    usuariosFiltrados = usuariosFiltrados.filter((usuario) => usuario.disciplina.toLowerCase() === disciplina.toLowerCase());
  }

  
  if (consulta) {
    usuariosFiltrados = usuariosFiltrados.filter((usuario) =>
      usuario.nome.toLowerCase().includes(consulta.toLowerCase())
    );
  }

  
  return res.json(usuariosFiltrados);
});

module.exports = router;
