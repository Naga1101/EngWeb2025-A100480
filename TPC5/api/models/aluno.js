var mongoose = require('mongoose')

//Tabela de Aluno
var alunosSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true, 
        index: true 
    },
    nome : String,
    github : String,
    tpc1 : Boolean,
    tpc2 : Boolean,
    tpc3 : Boolean,
    tpc4 : Boolean,
    tpc5 : Boolean,
    tpc6 : Boolean,
    tpc7 : Boolean,
    tpc8 : Boolean,
    teste : Number,
    pratica : Number,
}, {versionKey : false})

//Se aluno nao tiver s, o mongoDB coloca S se precisar
//Conectar à tabela "Alunos"
module.exports = mongoose.model('aluno', alunosSchema)