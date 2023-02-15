const mongoose = require("mongoose");
const productivitySchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    }

})

const productivityModel = mongoose.model("productivity", productivitySchema);
module.exports = productivityModel;