import { Product } from "../models/product.js"

export const deleteAllProductsByUser = (userId) => {
    try{
        const productsByUser = Product.find({userId})
        if(!productsByUser){
            return
        }
        productsByUser.forEach(product => {
            product.delete();
        });
    }
    catch(err) {
        console.error(`Server error - ${err}`)
    }

}