import React, { useEffect, useState } from "react";
import type { Service } from "../../../types/models";
import ServiceAPI from "../../../apis/servicesApi";
import { AxiosError } from "axios";
import { API_BASE_URL } from "../../../consts/consts";

function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getServices = async () => {
      try {
        setLoading(true);
        const res = await ServiceAPI.getAllServices();
        setServices(res);
      } catch (e) {
        if (e instanceof AxiosError) {
        }
      } finally {
        setLoading(false);
      }
    };
    getServices();
  }, []);
  return (
    <section className="mx-auto">
      <h1 className="font-semibold text-2xl mb-3 gap-3">Services</h1>
      <div className="flex gap-2 flex-wrap">
        {services.map((service, index) => {
          return (
            <React.Fragment key={index}>
              <div>
                <div className="">
                  <img
                    src={
                      service.imageUrl
                        ? `${API_BASE_URL}${service.imageUrl}`
                        : "https://dummyimage.com/1000x1000/000/fff"
                    }
                    className="w-[301px] h-[170px]  rounded-sm overflow-hidden object-cover"
                    alt=""
                  />
                </div>
                <h1 className="font-semibold">{service.title}</h1>
                <p className="text-sm text-gray-500">{service.description}</p>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
