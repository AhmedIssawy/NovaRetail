import Store from "../models/Store.model.js";

export const AddStore = async (req, res) => {
    const {name} = req.body;
    try{
        if (!name) {
            res.status(400).json("there is no name");
        }
        const CheckStore = await Store.findOne({ name });
        if (CheckStore) {
            res.status(400).json("Already exists");
        }
        const store = new Store({ name})
        await store.save();

        res.status(200).json(store);


    }catch(err){
        console.log(err);
    }
}