import api from "../config/axiosInstance";
import type { Service } from "../types/models";

const getAllServices = async () => {
  try {
    const res = await api.get<Service[]>("/services");
    return res.data;
  } catch (e) {
    throw e;
  }
};
const addService = async (
  service: Service,
  contentType: "multipart/form-data" | "application/json" = "application/json"
) => {
    const formData=new FormData()
    // Object.keys(service).map(key=>{
    //     formData.append(key,service[key as keyof Service])
    // })
  try {
    const res = await api.post<Service>(
      "/services",
      { service },
      {
        headers: {
          "Content-Type": contentType,
        },
      }
    );
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
};
export default ServiceAPI;
