const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/customer.repository')
const md5 = require('md5')

const emailServ = require('../services')

exports.get = async(req, res) => {
    try {
        var data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.post = async(req, res) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.name, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.isEmail(req.body.email, 'Email inválido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    // se dados invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    try{
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password)
        })

        emailServ.send(req.body.email, 'Bem vindo a Igor Store', global.EMAIL_TMPL.replace('{0}',req.body.name))

        res.status(201).send({
            message: 'Cliente cadastrado com sucesso'
        })
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
} 