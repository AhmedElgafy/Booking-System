import { API_BASE_URL } from "../../../consts/consts";
import type { Service } from "../../../types/models";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function ServiceCard({
  service,
  onDelete,
}: {
  service: Service;
  onDelete: (id: string) => void;
}) {
  return (
    <Link to={`/services/slots/${service.id}`} className="w-[30%] max-md:w-[100%]">
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
      <div className="flex justify-between">
        <div>
          <h1 className="font-semibold">{service.title}</h1>
          <p className="text-sm text-gray-500">{service.description}</p>
        </div>
        {Cookies.get("id") == service.providerId && (
          <img
            onClick={(e) => {
              e.stopPropagation();
              onDelete(service.id);
            }}
            className="fill-amber-700 hover:opacity-50 cursor-pointer"
            src="/delete.svg"
            alt="delete"
          />
        )}
      </div>
    </Link>
  );
}

export default ServiceCard;
