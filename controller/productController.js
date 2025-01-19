import Product from "../model/Product.js";

export function addProduct(req, res){
    const productData = req.body;

    const newProduct = new Product(productData);

    newProduct.save().then(
        ()=>{
           res.json ({
                massage : "Product save succefully."
            })
        }
    ).catch(
        ()=>{
            res.json({
                massage : "Product save failed."
            })
        }
    )
}