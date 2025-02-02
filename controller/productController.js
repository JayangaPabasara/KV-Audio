import Product from "../model/Product.js";
import { isAdmin } from "../Validation/userValidations.js";

export async function addProduct(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Please login and try again",
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "You are not authorized to perform this operation",
            });
        }

        const productData = req.body;
        const newProduct = new Product(productData);

        await newProduct.save();

        res.json({
            message: "Product saved successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: "Product save failed.",
            error: error.message, 
        });
    }
}



export async function getProduct(req, res){
    try{

        if(isAdmin(req)){
            const products = await Product.find();
        res.json(products); 
        }else{
            const products = await Product.find(
                ({availability : true}));
                res.json(products);
                return;
        }

        
    }catch(e){
        res.status(500).json({
            massage : "Failed to get products",
            error : e
        })
    }
}

export async function updateProduct(req, res){
    try{
        if(isAdmin(req)){

            const key = req.params.key;

            const data = req.body

            await Product.updateOne({key : key}, data);

            res.json({
                massage : "Product updated successfully"
            })
        }else{
            res.json({
                massage : "You are not autorized to perform this action"
            })
            return
        }
    }catch(e){
        res.status(500).json({
            massage : "Failed to update the product",
            error : e
        })
    }
}

export async function deleteProduct(req, res) {

    try{
        if(isAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key : key});

            res.json({
                massage : "Product deleted successfull"
            })
        }else{
            res.json({
                massage : "You have not authorize to perform this operation"
            })
        }
    }catch(e){
         res.status(500).json({
            massage : "Porduct deleted failed"
         })   
    }
    
}


