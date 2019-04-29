const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const GroceryListSchema = mongoose.Schema({
    name: String,
    list: Array,
    acctId: ObjectId
})

let GroceryListCollection = mongoose.model("groceryList", GroceryListSchema)

function listAllLists() {
    return GroceryListCollection.find()
}

function newGroceryList(listItems) {
    return GroceryListCollection.create(listItems)
}

function getGroceryListsByAccountId(acctId) {
    return GroceryListCollection.find({ acctId });
}
module.exports = {
    listAllLists,
    newGroceryList,
    getGroceryListsByAccountId
}