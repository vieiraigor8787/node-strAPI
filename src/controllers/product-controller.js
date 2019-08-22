//banco de dados
const mongoose = require('mongoose')
const Product = mongoose.model('Product')

const ValidationContract = require('../validators/fluent-validators')

exports.get = (req, res) => {
    Product.find({ 
        active:true 
        }, 'title price slug')//buscar tudo, porém so trazer titulo, preço e slug e prods ativos
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getBySlug = (req, res) => {
    Product.findOne({ //pra não trazer um array. Somente um resultado
            slug: req.params.slug,
            active:true 
            }, 'title description price slug tags')//buscar tudo, porém so trazer titulo, preço e slug e prods ativos
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getById = (req, res) => {
    Product.findById(req.params.id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(e => {
            res.status(400).send(e)
        })
}

exports.getbyTag = (req, res) => {
    Product.find({
            tags: req.params.tag,
            active: true
        }, 'title description price slug tags')
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

    var product = new Product(req.body)
    product.save()
        .then(x => {
            res.status(201).send({ message: 'Produto cadastrado com sucesso!' })
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao cadastrar produto', data: e})
        })
}

exports.put = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug
        }
    })
    .then(x => {
        res.status(200).send({ message: 'Produto atualizado com sucesso!' })
    })
    .catch(e => {
        res.status(400).send({ message: 'Falha ao atualizar produto', data: e})
    })
}

exports.delete = (req, res) => {
    Product.findOneAndRemove(req.body.id)
        .then(x => {
            res.status(200).send({ message: 'Produto removido com sucesso!' })
        })
        .catch(e => {
            res.status(400).send({ message: 'Falha ao remover o produto', data: e})
        })
}