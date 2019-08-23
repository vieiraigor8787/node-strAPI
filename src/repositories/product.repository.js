const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = () => Product.find({ 
        active:true 
        }, 'title price slug')

exports.getBySlug = (slug) => Product.findOne({ //pra não trazer um array. Somente um resultado
        slug: slug,
        active:true 
        }, 'title description price slug tags')//buscar tudo, porém so trazer titulo, preço e slug e prods ativos

exports.getById = (id) => Product.findById(id)

exports.getByTag = (tag) => Product.findOne({
        tags: tag,
        active: true
    }, 'title description price slug tags')

exports.create = data => {
    const product = new Product(data)
    return product.save()
}

exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

exports.delete = id => {
    return Product.findOneAndRemove(id)
}