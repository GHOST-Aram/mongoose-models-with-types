import mongoose from "mongoose"

interface IProduct{
    marked_price: number,
    buying_price: number
    selling_price: number
    name: string,
}

interface IProductVirtuals{
    discount: number,
    profit: number | false
    loss: number | false
}

type ProductModel = mongoose.Model<IProduct,{},{},IProductVirtuals>

const productSchema: mongoose.Schema = new mongoose.Schema<
IProduct, ProductModel,{}, {}, IProductVirtuals>({
    marked_price:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
    },
    selling_price:{
        type: Number,
        required: true
    },
    buying_price: {
        type: Number,
        required: true
    }
})

productSchema.virtual('profit').get(function():number | false{
    const profit = this.selling_price - this.buying_price
    return profit > 0 ? profit : false
})

productSchema.virtual('loss').get(function(): number | false {
    const loss = this.buying_price - this.selling_price

    return loss > 0 ? loss : false
})

productSchema.virtual('discount').get(function():number{
    const discount = this.marked_price - this.selling_price

    return discount > 0 ? discount : 0
})

const Product: ProductModel = mongoose.model<
IProduct, ProductModel>('Product', productSchema)

type HydratedProductDoc = mongoose.HydratedDocument<
IProduct, IProductVirtuals>

const product1: HydratedProductDoc = new Product({
    name: 'Motor Cycle',
    selling_price: 458900,
    buying_price: 430080,
    marked_price: 460000
})

const getSalesData = (product: HydratedProductDoc): {
    profit: number | false, loss: number|false, discount: number
} =>{
    const profit = product.profit
    const loss = product.loss
    const discount = product.discount

    return ({
        profit, loss, discount
    })
}

const salesData = getSalesData(product1)

console.log(salesData)