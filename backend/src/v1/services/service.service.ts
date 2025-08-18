import { Service, User } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas, { ValidService } from "../schemas/shemas";

const getServices = async () => {
  return prisma.service.findMany({ omit: { image: true } });
};
const serviceImage = async (imageUrl: string) => {
  return prisma.service.findFirst({
    where: { imageUrl: imageUrl },
    select: { image: true },
  });
};
const addService = async (service: Service, userId: string) => {
  const validService = Schemas.ServiceSchema.parse(service);

  service.providerId = userId;
  let newService = await prisma.service.create({
    data: validService,
    omit: { image: true },
  });
  if (service.image) {
    newService = await prisma.service.update({
      where: { id: newService.id },
      data: { imageUrl: `/service/image/${newService.id}` },
      omit: { image: true },
    });
  }
  return newService;
};
const updateService = async (id: string, service: Partial<Service>) => {
  const validService = Schemas.ServiceSchema.partial().parse(service);
  console.log(validService);
  let newService = await prisma.service.update({
    where: { id: id },
    data: validService,
    omit: { image: true },
  });
  if (service.image) {
    newService = await prisma.service.update({
      where: { id: id },
      data: { imageUrl: `/service/image/${newService.id}` },
      omit: { image: true },
    });
  }
  return newService;
};
const deleteService = (id: string) => {
  return prisma.service.delete({ where: { id: id } });
};
const ServiceServices = {
  getServices,
  deleteService,
  updateService,
  addService,
  serviceImage,
};
export default ServiceServices;
