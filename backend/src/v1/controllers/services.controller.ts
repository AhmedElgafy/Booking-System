import { NextFunction, Request, Response } from "express";
import { Service, User } from "../../generated/prisma";
import ServiceServices from "../services/service.service";
import uploader from "../config/multer";

const addService = async (
  req: Request<{}, {}, Service>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.files);
  try {
    if (req.file) {
      req.body.image = req.file.buffer;
    }
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
  req: Request<{}, Service, {}, { categoryId: string; title: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await ServiceServices.getServices(req.query);
    return res.status(200).send(services);
  } catch (e) {
    next(e);
  }
};
const getServiceById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const services = await ServiceServices.getServiceById(req.params.id);
    return res.status(200).send(services);
  } catch (e) {
    next(e);
  }
};

const getServiceImage = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = await ServiceServices.serviceImage(
      `/service/image/${req.params.id}`
    );
    res.set("Content-Type", "image/jpeg");
    return res.status(200).end(image?.image);
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
  req: Request<{ id: string }, {}, Service>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const { buffer } = req.file;
      req.body.image = buffer;
    }
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
  getServiceImage,
  getServiceById,
};
export default ServicesController;
