import { Service, User } from "../../generated/prisma";
import prisma from "../config/db";
import Schemas from "../schemas/shemas";

const getServices = async ({
  categoryId,
  title,
}: {
  categoryId: string;
  title: string;
}) => {
  return await prisma.service.findMany({
    omit: { image: true },
    where: {
      ...(title && {
        title: {
          contains: title,
          mode: "insensitive",
        },
      }),
      ...(categoryId && {
        categoryId: categoryId,
      }),
    },
  });
};
const serviceImage = async (imageUrl: string) => {
  return prisma.service.findFirst({
    where: { imageUrl: imageUrl },
    select: { image: true },
  });
};
const addService = async (service: Service, userId: string) => {
  // console.log(service);
  const validService = Schemas.ServiceSchema.parse(service);
  console.log(validService);
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
const getServiceById = async (id: string) => {
  return await prisma.service.findUnique({
    where: { id: id },
    omit: { image: true },
    include: { category: true },
  });
};
const ServiceServices = {
  getServices,
  deleteService,
  updateService,
  addService,
  serviceImage,
  getServiceById,
};
export default ServiceServices;
