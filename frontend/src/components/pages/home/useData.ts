import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import ServiceAPI from "../../../apis/servicesApi";
import type { Service } from "../../../types/models";
import { useSearchParams } from "react-router-dom";

const useData = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, _] = useSearchParams();
  const getServices = async () => {
    try {
      setLoading(true);
      const res = await ServiceAPI.getAllServices({
        categoryId: searchParams.get("categoryId") || "",
        title: searchParams.get("q") || "",
      });
      setServices(res);
    } catch (e) {
      if (e instanceof AxiosError) {
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getServices();
  }, [searchParams]);
  return {
    services,
    loading,
    
  };
};
export default useData;
