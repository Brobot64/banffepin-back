import { Request, Response } from 'express';
import {
  getEpins,
  getSoldEpins,
  getUnsoldEpins,
  getEpinBySerial,
  getEpinById,
  assignEPinsToAgent,
  getAvailableTelcosWithDenominations
} from '../services/efiles'; 
import { getOrdersByUserId } from '../services/vending';
import { getAssignedPinsById, getPinsByOrderId } from '../services/assignedpins';

// Controller function to get all ePins or filter by query
const getAllEpins = async (req: Request, res: Response) => {
  try {
    const epins = await getEpins();
    res.status(200).json(epins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get sold ePins
const getSoldEpinsController = async (req: Request, res: Response) => {
  try {
    const soldEpins = await getSoldEpins();
    res.status(200).json(soldEpins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get unsold ePins
const getUnsoldEpinsController = async (req: Request, res: Response) => {
  try {
    const unsoldEpins = await getUnsoldEpins();
    res.status(200).json(unsoldEpins);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get ePin by serial
const getEpinBySerialController = async (req: Request, res: Response) => {
  const { serial } = req.params;
  try {
    const epin = await getEpinBySerial(serial);
    if (epin) {
      res.status(200).json({
        epin
      });
    } else {
      res.status(404).json({ message: `ePin with serial ${serial} not found` });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get ePin by id
const getEpinByIdController = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const epin = await getEpinById(id);
    if (epin) {
      res.status(200).json({
        epin,
      });
    } else {
      res.status(404).json({ message: `ePin with id ${id} not found` });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get orders by id
const getOrdersByIdController =  async (req: Request, res: Response) => {
    const { user } = req.params;
    try {
        const orders = await getOrdersByUserId(user);
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

const placeOrderByUserController =  async (req: Request, res: Response) => {
    const { user } = req.params;
    try {
        const response = await assignEPinsToAgent(user as string, req.body);
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error.message }); 
    }
}

const fetchAvailableTelcosWithDenominations = async (req: Request, res: Response) => {
    try {
        const data = await getAvailableTelcosWithDenominations();
        return res.status(200).json({
            message: "Available telcos with denominations fetched successfully",
            data
        });
    } catch (error: any) {
        return res.status(500).json({
            message: error?.message
        });
    }
};

const getVended = async (req: Request, res: Response) => {
  try {
    const data = await getAssignedPinsById(req.params.id);
    res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message
    });
  }
}

const getVendedByOrder = async (req: Request, res: Response) => {
  try {
    const data = await getPinsByOrderId(req.params.order);
    res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({
      message: error?.message
    });
  }
}


export {
  getAllEpins,
  getVended,
  getVendedByOrder,
  getOrdersByIdController,
  placeOrderByUserController,
  getSoldEpinsController,
  getUnsoldEpinsController,
  getEpinBySerialController,
  getEpinByIdController,
  fetchAvailableTelcosWithDenominations
};
