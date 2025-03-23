var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:7070/alunos")
  .then(resp => {
    data = resp.data
    res.status(200)
    res.render('studentsListPage', { slist: data });
  })
  .catch(erro => {
    console.log(erro)
    res.render('error', {error: erro})
  })
});

router.get('/registo', function(req, res, next) {
  res.render('registStudentForm');
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:7070/alunos/" + req.params.id)
    .then(resp => {
      const data = resp.data;
      console.log(data);
      res.status(200);
      res.render('studentPage', { aluno: data });
    })
    .catch(erro => {
      console.log(erro);
      res.render('error', {error: erro});
    });
});


router.get('/edit/:id', function(req, res, next) {
  axios.get("http://localhost:7070/alunos/" + req.params.id)
  .then(resp => {
    data = resp.data
    res.status(200)
    res.render('editStudentsForm', { a: data });
  })
  .catch(erro => {
    console.log(erro)
    res.render('error', {error: erro})
  })
});

router.get('/delete/:id', function(req, res, next) {
  axios.delete("http://localhost:7070/alunos/" + req.params.id)
  .then(resp => {
    res.redirect('/alunos')
  })
  .catch(erro => {
    console.log(erro)
    res.render('error', {error: erro})
  })
});

router.post('/registo', async (req, res) => {
  try {
      await axios.post(`http://localhost:7070/alunos`, req.body);
      res.redirect('/alunos');
  } catch (error) {
      console.error('Erro ao criar aluno:', error);
      res.status(500).send('Erro ao criar o aluno');
  }
});


router.post('/edit/:id', async (req, res) => {
  try {
      await axios.put(`http://localhost:7070/alunos/` + req.params.id, req.body);
      res.redirect('/alunos');
  } catch (error) {
      console.error('Erro ao criar aluno:', error);
      res.status(500).send('Erro ao criar o aluno');
  }
});


module.exports = router;