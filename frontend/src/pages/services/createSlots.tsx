import React, { useEffect, useState } from "react";
import type { Category, Service } from "../../types/models";
import { Link, useParams } from "react-router-dom";
import ServiceAPI from "../../apis/servicesApi";
import { API_BASE_URL } from "../../consts/consts";
import Slots from "../../components/pages/services/slots";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
type ServiceCat = Service & {
  category: Category;
};
function CreateSlots() {
  const [service, setService] = useState<ServiceCat | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const { id } = useParams();
  const getService = async () => {
    try {
      const res = await ServiceAPI.getServiceById(id || "");
      setService(res);
    } catch (e) {}
  };
  useEffect(() => {
    getService();
  }, []);
  return (
    <section className="flex gap-5 max-md:flex-col">
      <img
        className="flex-1/2 rounded-sm overflow-hidden object-cover"
        src={
          service?.imageUrl
            ? `${API_BASE_URL}${service?.imageUrl}`
            : "https://dummyimage.com/1000x1000/000/fff"
        }
        alt=""
      />
      <div className="space-y-5 flex-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold">{service?.title}</h1>
          {user.user?.role == "PROVIDER" &&
            user.user.id == service?.providerId && (
              <Link
                to={`/services/${service?.id}`}
                className="bg-gray-300 p-[5px_12px] rounded-md hover:opacity-50"
              >
                Edit
              </Link>
            )}
        </div>
        <p className="text-base text-gray-500">{service?.description}</p>
        <div>
          <p className="mb-1">Category :</p>
          <p className="bg-gray-300 w-fit rounded-md p-[5px_15px]">
            {service?.category.name}
          </p>
        </div>
        <div>
          <p className="mb-1 ">Time slots :</p>
          {service && <Slots service={service} />}
        </div>
      </div>
    </section>
  );
}

export default CreateSlots;
