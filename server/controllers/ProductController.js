const Product = require("../models/Product");

exports.GetAllProducts  = async (req, res) => {
    try {
        const products = await Product.find({}); // Add await
        res.status(200).json(products);
    }
    catch (err) {
        console.error("Error getting products list: ", err);
        res.status(500).json({ error: 'Error fetching products: ' + err.message });
    }
}
exports.getProductsCatRelated = async (req, res) => {
    const category = req.params.name;
    try{
        const ProductsRelated = await Product.find({
            where: {
                category: category
            }
        });

        res.json(ProductsRelated);

    }catch(err){
        res.status(400).json("Get Products Failed");
    }

}

exports.AddProduct = async (req, res) => {
    const {name,category, description, price, img,store,lowStockThreshold} = req.body;
    try {
        const newProduct = new Product({ name, description, price, img,store,category,lowStockThreshold }); // Correct instantiation
        await newProduct.save();
        res.status(200).json(newProduct);
    }
    catch (err) {
        console.error("Error adding product: ", err);
        res.status(500).json({ error: 'Error adding product: ' + err.message });
    }
}

exports.EditProduct = async (req, res) => {
    const id = req.params.id;
    const {name,category, description, price, img,store} = req.body;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        // Update fields
        product.name = name;
        product.description = description;
        product.price = price;
        product.img = img;
        product.category = category;

        await product.save();
        res.status(200).json(product);
    }
    catch (err) {
        console.error("Error editing product: ", err);
        res.status(500).json({ error: 'Error editing product: ' + err.message });
    }
}

exports.DeleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({error: 'Product not found'});
        }
        await product.remove(); // await remove
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (err) {
        console.error("Error deleting product: ", err);
        res.status(500).json({ error: 'Error deleting product: ' + err.message });
    }
}