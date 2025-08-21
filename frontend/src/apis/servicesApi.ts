import api from "../config/axiosInstance";
import type { Category, Service } from "../types/models";

const getAllServices = async (queryParam: {
  categoryId: string;
  title: string;
}) => {
  try {
    const res = await api.get<Service[]>("/services", { params: queryParam });
    return res.data;
  } catch (e) {
    throw e;
  }
};
type ServiceCat = Service & {
  category: Category;
};
const getServiceById = async (id: string) => {
  try {
    const res = await api.get<ServiceCat>("/services/" + id);
    return res.data;
  } catch (e) {
    throw e;
  }
};
const addService = async (
  service: Service,
  contentType: "multipart/form-data" | "application/json" = "application/json"
) => {
  const formData = new FormData();
  formData.append("title", service.title);
  formData.append("description", service.description);
  formData.append("price", String(service.price));
  console.log(service.image);
  service.image && formData.append("image", service.image);
  try {
    const res = await api.post<Service>("/services", service, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const deleteService = async (id: string) => {
  try {
    const res = await api.delete<{ message: string }>(`/services/${id}`);
    return res.data;
  } catch (e) {
    throw e;
  }
};

const updateService = async (
  id: string,
  service: Partial<Service>,
  contentType: "multipart/form-data" | "application/json" = "application/json"
) => {
  try {
    const res = await api.patch<Service>(`/services/${id}`, service, {
      headers: {
        "Content-Type": contentType,
      },
    });
    return res.data;
  } catch (e) {
    throw e;
  }
};

const ServiceAPI = {
  getAllServices,
  addService,
  deleteService,
  updateService,
  getServiceById,
};
export default ServiceAPI;
