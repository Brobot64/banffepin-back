import Order, { IOrder } from "../models/vends";


// Get orders by userId
const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  try {
    const orders = await Order.find({ userId }).exec();
    return orders;
  } catch (error: any) {
    throw new Error(`Failed to fetch orders by userId: ${error.message}`);
  }
};

// Update an order by orderId
const updateOrder = async (orderId: string, updatedOrder: Partial<IOrder>): Promise<IOrder | null> => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, updatedOrder, { new: true }).exec();
    return order;
  } catch (error: any) {
    throw new Error(`Failed to update order: ${error.message}`);
  }
};

// Delete an order by orderId
const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    await Order.findByIdAndDelete(orderId).exec();
  } catch (error: any) {
    throw new Error(`Failed to delete order: ${error.message}`);
  }
};

export {
  getOrdersByUserId,
  updateOrder,
  deleteOrder
};
