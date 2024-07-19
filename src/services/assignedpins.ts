import { Document, Types } from 'mongoose';
import userpinsModel, { IUserPinAssignment } from '../models/userhistory';

// Service to get assigned pins by assignment ID
export const getAssignedPinsById = async (id: string): Promise<IUserPinAssignment | null> => {
  try {
    // Validate the ID
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    // Find the UserPinAssignment document by its ID
    const assignedPins = await userpinsModel.findById(id).exec();

    if (!assignedPins) {
      throw new Error(`No assigned pins found with ID: ${id}`);
    }

    return assignedPins;
  } catch (error: any) {
    throw new Error(`Failed to fetch assigned pins by ID: ${error.message}`);
  }
};


export const getPinsByOrderId = async (id: any) => {
    try {
        const assignedPins = await userpinsModel.find({ orderid: id }).exec();
        if (!assignedPins) {
            throw new Error(`No assigned pins found with ID: ${id}`);
        }
      
        return assignedPins;
    } catch (error: any) {
        throw new Error(`Failed to fetch assigned pins by ID: ${error.message}`);
    }
}
