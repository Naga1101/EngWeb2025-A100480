var Aluno = require('../models/aluno');

module.exports.list = () => {
    return Aluno
        .find()
        .sort({nome : 1})
        .exec();
}

module.exports.findById = (id) => {
    return Aluno
        .findOne({"id" : id})
        .exec()
}

module.exports.insert = aluno => {
    if(Aluno.find({id : aluno.id}).exec().length != 1){
        console.log("insert ", aluno);
        var newAluno = new Aluno(aluno)
        newAluno.id = aluno.id; 
        return newAluno.save()
    }
}

module.exports.update = (id, aluno) => {
    return Aluno.findByIdAndUpdate({ id: id }, aluno, { new: true }).exec();
}

module.exports.delete = id => {
    return Aluno.findOneAndDelete({ id: id }).exec();
}  

module.exports.inverteTpc = (id, idTpc) => {
    return Aluno
        .findOne({ 'id': id })
        .exec()
        .then(aluno => {
            var tpc = `tpc${idTpc}`;
            if (aluno[tpc]) {
                aluno[tpc] = !aluno[tpc]; // Toggle the value of the TPC
            } else {
                aluno[tpc] = true; // If it doesn't exist, create it and set to true
            }
            return Aluno.findByIdAndUpdate(id, aluno, { new: true }).exec();
        });
}
