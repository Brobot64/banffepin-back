import fs from 'fs';
import { decrypt, encrypt, passCompare } from '../utils/encryptions';
import epinModel, { IE_Pin } from '../models/epin';
import Order from '../models/vends';
import userpinsModel from '../models/userhistory';
import accountModel from '../models/account';

function removeFirstLast(arr: any[]) {
    return arr.slice(1, arr.length - 2);
}


export const uploadEPinFiles = async (filePath: string, telco: string, country: string) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lints = fileContent.split('\n');
    const lines = removeFirstLast(lints);

    for (const line of lines) {
        const [epin, serial, nums, zers, date] = line.split(',');
        const salted = encrypt(epin);
        const denomination = parseInt(nums.trim());

        await epinModel.create({
            denomination,
            pin: salted,
            telco,
            serial,
            country
        });
    }


    return { message: "Data Uploaded" }
}


// Service to get all ePins or filter by query
export const getEpins = async (query: Partial<IE_Pin> = {}): Promise<IE_Pin[]> => {
  try {
    const epins = await epinModel.find(query).exec();
    return epins.map(epin => ({
      ...epin.toObject(),
      pin: decrypt(epin.pin)
    }));
  } catch (error: any) {
    throw new Error(`Failed to fetch ePins: ${error.message}`);
  }
};

// Service to get sold ePins
export const getSoldEpins = async (): Promise<IE_Pin[]> => {
  return getEpins({ isSold: true });
};

// Service to get unsold ePins
export const getUnsoldEpins = async (): Promise<IE_Pin[]> => {
  return getEpins({ isSold: false });
};

// Service to get ePin by serial
export const getEpinBySerial = async (serial: string): Promise<IE_Pin | null> => {
  try {
    const epin = await epinModel.findOne({ serial }).exec();
    if (epin) {
      return {
        ...epin.toObject(),
        pin: decrypt(epin.pin)
      };
    }
    return null;
  } catch (error: any) {
    throw new Error(`Failed to fetch ePin by serial: ${error.message}`);
  }
};

// Service to get ePin by id
export const getEpinById = async (id: string): Promise<IE_Pin | null> => {
  try {
    const epin = await epinModel.findById(id).exec();
    if (epin) {
      return {
        ...epin.toObject(),
        pin: decrypt(epin.pin)
      };
    }
    return null;
  } catch (error: any) {
    throw new Error(`Failed to fetch ePin by id: ${error.message}`);
  }
};


export const assignEPinsToAgent = async (agentId: string, cart: any[], pin: string) => {
    const epinsToAssign: Record<string, { pins: string[], denomination: string, timAt?: string }> = {};

    const userPin = await accountModel.findById(agentId).select('transact_pin').lean();

    if(!userPin) throw new Error("Account not existing");

    const pinMatch = await passCompare(pin, userPin?.transact_pin)

    if (!pinMatch) throw new Error("Incorrect Pin");
  
    for (const item of cart) {
      const { denomination, quantity, telco } = item;
      const pins = await epinModel.find({ denomination, telco, isSold: false }).limit(quantity);
  
      if (pins.length < quantity) {
        throw new Error(`Not enough E-Pins available for denomination ${denomination} and telco ${telco}`);
      }
  
      const pinNumbers = pins.map(pin => decrypt(pin.pin)); //pin.pin);
      if (!epinsToAssign[telco]) {
        epinsToAssign[telco] = { pins: [], denomination: denomination.toString(), timAt: '' };
      }
      epinsToAssign[telco].pins.push(...pinNumbers);
  
      // Save the assigned pins
      // for (const [telco, { pins, denomination }] of Object.entries(epinsToAssign)) {
      
      const newOrder = new Order({ userId: agentId , cart });
      const savedOrder = await newOrder.save();
      
      const userPinAssignment = new userpinsModel({
          userId: agentId,
          telco,
          denomination: denomination.toString(),
          pins: pinNumbers, // This is already an array of strings
          assignedAt: new Date(),
          orderid: savedOrder._id
      });
      await userPinAssignment.save();
      epinsToAssign[telco].timAt = userPinAssignment.assignedAt.toString();


      await epinModel.updateMany(
        { _id: { $in: pins.map(pin => pin._id) } },
        { $set: { isSold: true } }
      );
  
    }
  
    return epinsToAssign;
  };



export const getAvailableTelcosWithDenominations = async () => {
    try {
        const unsoldPins = await epinModel.find({ isSold: false }, 'denomination telco').lean();
        
        const telcosWithDenominations: Record<string, Set<string>> = {};

        unsoldPins.forEach(pin => {
            if (!telcosWithDenominations[pin.telco]) {
                telcosWithDenominations[pin.telco] = new Set();
            }
            telcosWithDenominations[pin.telco].add(pin.denomination);
        });

        const result = Object.entries(telcosWithDenominations).map(([telco, denominations]) => ({
            telco,
            denominations: Array.from(denominations)
        }));

        return result;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
  
  


