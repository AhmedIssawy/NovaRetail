import Sale from "../models/Sale.js";
import Store from "../models/Store.model.js";
import Product from "../models/Product.model.js";
import Order from "../models/Order.js";

const GetAllSales = async (req, res) => {

    try {
        const orders = await Sale.find({})
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders with products:', err);
        res.status(500).json({ error: 'Error fetching orders with products: ' + err.message });
    }
}

const AddSale = async (req, res) => {
    const { products, store } = req.body;

    const checkStore = await Store.findOne({
        store: store
    })
    if (!checkStore) {
        res.status(404).json({
            error: 'No store found'
        })
    }


    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'Products array is required' });
    }


    try {
        let totalAmount = 0;
        const productDetails = [];

        const productIds = products.map(p => p.productId);
        const dbProducts = await Product.find({ _id: { $in: productIds } });

        const productMap = new Map();
        dbProducts.forEach(p => productMap.set(p._id.toString(), p));

        // Validate products and calculate total
        for (const { productId, quantity } of products) {
            if (!productId || !quantity || quantity <= 0) {
                return res.status(400).json({ error: 'Valid productId and quantity are required' });
            }

            const product = productMap.get(productId);
            if (!product) {
                return res.status(404).json({ error: `Product not found: ${productId}` });
            }

            if (product.quantity < quantity)
            {
                return res.status(400).json({ error: `Insufficient stock for: ${product.name}` });
            }

            totalAmount += product.price * quantity;
            productDetails.push({ product, quantity });
        }

        // Deduct stock using bulkWrite
        const bulkOps = productDetails.map(({ product, quantity }) => ({
            updateOne: {
                filter: { _id: product._id },
                update: { $inc: { quantity: -quantity } }
            }
        }));
        await Product.bulkWrite(bulkOps);

        // Prepare products array for sale
        const saleProducts = productDetails.map(({ product, quantity }) => ({
            product: product._id,
            quantity: quantity,
            price: product.price
        }));

        // Create and save sale
        const newSale = new Sale({
            total_amount: totalAmount,
            status: 'Placed',
            products: saleProducts,
            store: store,
        });

        await newSale.save();

        res.status(201).json({ orderId: newSale._id });
    } catch (err) {
        console.error('Error creating sale:', err);
        res.status(500).json({ error: 'Error creating sale: ' + err.message });
    }
};


const EditSale = async (req, res) => {
    const id = req.params.id;
    const order_status = req.body

    try{
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({error: 'Order not found'});
        }
        order.status = order_status;
    }
    catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Error creating order:'+ err.message });
    }


}

const DeleteSale = async (req, res) => {
   const id = req.params.id;
    try{
        //add the
        const order = await Order.findById(id);
        order.destroy();
        return res.status(200).json("Order deleted successfully : "+ order.id);
    }
    catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Error creating order:'+ err.message });
    }

}

export { GetAllSales, AddSale, EditSale, DeleteSale };