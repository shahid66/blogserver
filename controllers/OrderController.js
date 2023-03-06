
const OrderModel = require("../models/orderModel");

exports.createOrder = async (req, res) => {
    try {

    const cartUsersMatch = await cartModel.findOne({ $and: [ { userId: req.user._id }, { status: false } ] });
    const {address,totalPrice,name,email} = req.body;
    const order = new OrderModel({ userId:req.user._id,address,totalPrice,name,email, list:cartUsersMatch.items });
    await order.save();
    res.status(201).json(order);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error',err });
    }
  };

  exports.getAllOrder = async (req, res) => {
    try {
      
      const orders = await OrderModel.find({});
      res.json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };