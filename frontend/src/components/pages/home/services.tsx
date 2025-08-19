import React from "react";
import useData from "./useData";
import ServiceCard from "../addService/serviceCard";

function Services() {
  const { loading, services, deleteService } = useData();
  return (
    <section className="mx-auto">
      <h1 className="font-semibold text-2xl mb-3 gap-3">Services</h1>
      <div className="flex gap-2 flex-wrap">
        {services.map((service, index) => {
          return (
            <React.Fragment key={index}>
              <ServiceCard onDelete={deleteService} service={service} />
            </React.Fragment>
          );
        })}
        {!services.length && !loading && (
          <div className="h-[50vh] flex items-center w-full justify-center">
            <p className="font-black text-5xl">There is no data</p>
          </div>
        )}
        {loading && (
          <div className="h-[50vh] flex items-center w-full justify-center">
            <img
              src="/loading.svg"
              alt=""
              className="size-5 animate-spin block"
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;
