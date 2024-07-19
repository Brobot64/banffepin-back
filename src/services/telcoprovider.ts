import TelcoProviderModel, { ITelcoProvider } from '../models/telcoproviders';
import schedulerModel from '../models/scheduler';

// Create a new telco provider
export const createTelcoProvider = async (data: ITelcoProvider): Promise<ITelcoProvider> => {
    const newTelcoProvider = new TelcoProviderModel(data);
    return await newTelcoProvider.save();
};

// Get all telco providers
export const getAllTelcoProviders = async (filters: { country?: string, name?: string }): Promise<ITelcoProvider[]> => {
    const query: any = {};
    if (filters.country) {
        query.country = filters.country;
    }
    if (filters.name) {
        query.name = filters.name;
    }
    return await TelcoProviderModel.find(query).populate('schedule').exec();
};

// Get a telco provider by ID
export const getTelcoProviderById = async (id: string): Promise<ITelcoProvider | null> => {
    return await TelcoProviderModel.findById(id).populate('schedule').exec();
};

// Update a telco provider by ID
export const updateTelcoProviderById = async (id: string, data: Partial<ITelcoProvider>): Promise<ITelcoProvider | null> => {
    return await TelcoProviderModel.findByIdAndUpdate(id, data, { new: true }).populate('schedule').exec();
};

// Delete a telco provider by ID
export const deleteTelcoProviderById = async (id: string): Promise<ITelcoProvider | null> => {
    return await TelcoProviderModel.findByIdAndDelete(id).populate('schedule').exec();
};
