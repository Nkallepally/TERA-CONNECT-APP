const express = require("express");
const productivityModel = require("../modals/productivity");
const router = express.Router();

router.post("/add/item", async (req, res) => {
    try {
        const newItem = new productivityModel({
            item: req.body.item
        })
        const savedItem = await newItem.save()
        res.status(200).send(savedItem)
    } catch (err) {
        res.send(err)
    }
});

router.get("/all/items", async (req, res) => {
    try {
        const allItems = await productivityModel.find({});
        res.status(200).send(allItems)
    } catch (err) {
        res.send(err)

    }
});

router.put("/api/item/:id", async (req, res) => {
    try {
        const editedItem = await productivityModel.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).send(editedItem)
    } catch (err) {
        res.send(err)
    }
});

router.delete("/api/item/:id", async (req, res) => {
    try {
        const deletedItem = await productivityModel.findByIdAndDelete(req.params.id)
        res.status(200).send("Item Deleted Successfully")
    } catch (err) {
        res.send(err)
    }
})


module.exports = router;