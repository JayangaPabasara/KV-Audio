import Product from "../model/Product.js";

export function addProduct(req, res){

    if(req.user == null){
        res.status(401).json({
            massage : "Please login and try again"
        })
        return
    }

    if(req.user.role != 'admin'){
        res.status(403).json({
            massage : "Your not authorized to perform this operation"
        });
        return
    }

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