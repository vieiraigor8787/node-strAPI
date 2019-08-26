const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/order.repository')
const guid = require('guid')

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
    // let contract = new ValidationContract()
    // contract.hasMinLen(req.body.name, 3, 'O título deve conter pelo menos 3 caracteres')
    // contract.isEmail(req.body.email, 'Email inválido')
    // contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    // if (!contract.isValid()) {
    //     res.status(400).send(contract.errors()).end()
    //     return
    // }
    try{
        await repository.create({
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        })
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso'
        })
    } catch(e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
} 