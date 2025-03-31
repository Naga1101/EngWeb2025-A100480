var Contrato = require('../models/contratos')

// gets

module.exports.list = () => {
    return Contrato
        .find()
        .sort({id : 1})
        .exec();
}

module.exports.findById = (id) => {
    return Contrato
        .findOne({"_id" : id})
        .exec()
}

module.exports.getContratoByEntidade = entidade => {
    return Contrato.find({'entidade_comunicante' : entidade})
                .exec()   
}

module.exports.getContratoByEntidadeID = entidadeID => {
    return Contrato.find({'NIPC_entidade_comunicante' : entidadeID})
                .exec()   
}

module.exports.getContractByTipo = tipo => {
    return Contrato.find({'tipoprocedimento' : tipo})
                .exec()   
}

module.exports.listEntidades = () => {
    return Contrato.distinct('entidade_comunicante')
                .sort({'entidade_comunicante' : 1})
                .exec()   
}

module.exports.listTipos = () => {
    return Contrato.distinct('tipoprocedimento')
                .sort({'tipoprocedimento' : 1})
                .exec()   
}

// insert

module.exports.insert = contrato => {
    var newContrato = new Contrato(contrato);
    return newContrato.save();
}

// update

module.exports.update = (id, contrato) => {
    return Contrato
        .findByIdAndUpdate(id, contrato, {new: true})
        .exec();
}

// delete

module.exports.delete = id => {
    return Contrato
        .findByIdAndDelete(id, {new: true})
        .exec();
}