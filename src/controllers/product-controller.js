//banco de dados
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const ValidationContract = require('../validators/fluent-validators')
const repository = require('../repositories/product.repository')

exports.get = (req, res) => {
    repository.get()
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getBySlug = (req, res) => {
    repository.getBySlug(req.params.slug)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getById = (req, res) => {
    repository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getbyTag = (req, res) => {
    repository.getbyTag(req.params.tag)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.post = (req, res) => {
    let contract = new ValidationContract()
    contract.hasMinLen(req.body.title, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.slug, 3, 'O título deve conter pelo menos 3 caracteres')
    contract.hasMinLen(req.body.description, 3, 'O título deve conter pelo menos 3 caracteres')

    // se dados invalidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar produto', data: e})
        })
}

exports.put = (req, res) => {
   repository.update(req.params.id, req.body)
    .then(x => {
        res.status(200).send({ message: 'Produto atualizado com sucesso!' })
    })
    .catch(e => {
        res.status(400).send({ message: 'Falha ao atualizar produto', data: e})
    })
}

exports.delete = (req, res) => {
   repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto removido com sucesso!' })
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao remover o produto', data: e})
        })
}