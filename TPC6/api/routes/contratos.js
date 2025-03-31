var express = require('express');
var router = express.Router();
var Contrato = require('../controllers/contratos')

// gets

router.get('/', function(req, res, next) {
    if (req.query.entidade) {
      Contrato.getContratoByEntidade(req.query.entidade)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
    }
    else if (req.query.tipo) {
      Contrato.getContractByTipo(req.query.tipo)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
    }
    else {
      Contrato.list()
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
    }
  });

  router.get('/entidades', function(req, res, next) {
    Contrato.listEntidades()
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  router.get('/entidades/:id', function(req, res, next) {
    var id = req.params.id
    Contrato.getContratoByEntidade(id)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  router.get('/tipos', function(req, res, next) {
    Contrato.listTipos()
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  router.get('/:id', function(req, res, next) {
    Contrato.findById(req.params.id)
      .then(data => res.status(200).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  // post

  router.post('/', function(req, res, next) {
    Contrato.insert(req.body)
      .then(data => res.status(201).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  // put

  router.put('/:id', function(req, res, next) {
    Contrato.update(req.params.id, req.body)
      .then(data => res.status(201).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  // delete

  router.delete('/:id', function(req, res, next) {
    Contrato.delete(req.params.id)
      .then(data => res.status(201).jsonp(data))
      .catch(erro => res.status(500).jsonp(erro))
  });

  module.exports = router;