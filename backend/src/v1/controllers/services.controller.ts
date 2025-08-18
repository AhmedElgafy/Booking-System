import { NextFunction, Request, Response } from "express";
import { Service, User } from "../../generated/prisma";
import ServiceServices from "../services/service.service";

const addService = async (
  req: Request<{}, {}, Service>,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await ServiceServices.addService(
      req.body || {},
      req.user.id
    );
    res.status(201).send(service);
    return;
  } catch (e) {
    next(e);
  }
};
const getAllServices = async (
  req: Request<{}, Service>,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await ServiceServices.getServices();
    return res.status(200).send(services);
  } catch (e) {
    next(e);
  }
};
const deleteService = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await ServiceServices.deleteService(req.params.id);
    return res.status(204).send(service);
  } catch (e) {
    next(e);
  }
};
const updateService = async (
  req: Request<{ id: string }, Service>,
  res: Response,
  next: NextFunction
) => {
  try {
    const service = await ServiceServices.updateService(
      req.params.id,
      req.body
    );
    return res.status(200).send(service);
  } catch (e) {
    next(e);
  }
};
const ServicesController = {
  updateService,
  deleteService,
  getAllServices,
  addService,
};
export default ServicesController;
