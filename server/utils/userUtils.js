import { Product } from "../models/product.js"

export async function deleteAllProductsByUser(userId){
    try{
        const productsByUser = await Product.find({userId})
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
