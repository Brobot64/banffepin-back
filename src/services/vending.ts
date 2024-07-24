import Order, { IOrder } from "../models/vends";
// Adjust the import according to your project structure
import { startOfDay, startOfWeek, startOfMonth, endOfDay, endOfWeek, endOfMonth } from 'date-fns'; // Use date-fns for date manipulation


// Get orders by userId
// const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
//   try {
//     const orders = await Order.find({ userId }).exec();
//     return orders;
//   } catch (error: any) {
//     throw new Error(`Failed to fetch orders by userId: ${error.message}`);
//   }
// };

// Get orders by userId with query, date filtering, pagination, and limit
const getOrdersByUserId = async (userId: string, query: any = {}, dateOption: string = '', customStartDate?: Date, customEndDate?: Date, page: number = 1, limit: number = 30): Promise<IOrder[]> => {
  try {
    // Merge userId into the query object
    const searchQuery = { ...query, userId };

    // Date filtering logic
    let startDate: Date;
    let endDate: Date;

    const now = new Date();

    switch (dateOption) {
      case 'today':
        startDate = startOfDay(now);
        endDate = endOfDay(now);
        break;
      case 'week':
        startDate = startOfWeek(now, { weekStartsOn: 1 }); // Assuming week starts on Monday
        endDate = endOfWeek(now, { weekStartsOn: 1 });
        break;
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'custom':
        if (!customStartDate || !customEndDate) {
          throw new Error('Custom date range requires both start and end dates');
        }
        startDate = customStartDate;
        endDate = customEndDate;
        break;
      default:
        startDate = new Date(0); // Epoch time for no date filter
        endDate = now;
    }

    if (dateOption) {
      searchQuery.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Calculate the skip value for pagination
    const skip = (page - 1) * limit;

    // Fetch orders based on query, date filtering, pagination, and limit
    const orders = await Order.find(searchQuery)
                              .skip(skip)
                              .limit(limit)
                              .exec();

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
