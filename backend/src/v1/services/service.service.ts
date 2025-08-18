import { Service, User } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas, { ValidService } from "../schemas/shemas";

const getServices = async () => {
  return prisma.service.findMany();
};
const addService = async (service: Service, userId: string) => {
  const validService = Schemas.ServiceSchema.parse(service);

  service.providerId = userId;
  return await prisma.service.create({ data: validService });
};
const updateService = async (id:string,service: Partial<Service>) => {
  const validService = Schemas.ServiceSchema.partial().parse(service);
  console.log(validService);
  return await prisma.service.update({
    where: { id: id },
    data: validService,
  });
};
const deleteService = (id: string) => {
  return prisma.service.delete({ where: { id: id } });
};
const ServiceServices = {
  getServices,
  deleteService,
  updateService,
  addService,
};
export default ServiceServices;
