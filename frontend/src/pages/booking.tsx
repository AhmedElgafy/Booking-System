import React, { useEffect, useState } from "react";
import type { BookingId, Service } from "../types/models";
import BookingApi from "../apis/bookingApi";
import { API_BASE_URL } from "../consts/consts";

function Booking() {
  const [services, setServices] = useState<(Service & BookingId)[]>([]);
  const [loading, setLoading] = useState<{ getData: boolean; delete: boolean }>(
    { delete: false, getData: false }
  );
  const handleLoading = (key: "getData" | "delete", value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  };
  const getBookingServices = async () => {
    try {
      handleLoading("getData", true);
      const res = await BookingApi.getOwnBooking();
      setServices(res.data);
    } catch (e) {
    } finally {
      handleLoading("getData", false);
    }
  };
  const cancelBooking = async (id: string) => {
    try {
      handleLoading("delete", true);

      await BookingApi.cancelBooking(id);
      getBookingServices();
    } catch (e) {
    } finally {
      handleLoading("delete", false);
    }
  };
  useEffect(() => {
    getBookingServices();
  }, []);
  return (
    <section>
      <h1 className="font-bold text-3xl mb-5">My Own Bookings</h1>
      <div className="space-y-4">
        {services.map((service) => {
          return (
            <div
              key={service.id}
              className="border-1 md:h-40 flex max-md:flex-col justify-between overflow-hidden rounded-md border-gray-400"
            >
              <div className="h-full flex max-md:flex-col ">
                <img
                  className="w-[300px] h-full object-cover"
                  src={
                    service?.imageUrl
                      ? `${API_BASE_URL}${service?.imageUrl}`
                      : "https://dummyimage.com/1000x1000/000/fff"
                  }
                  alt=""
                />
                <div className="p-5">
                  <h1 className="font-semibold text-2xl">{service.title}</h1>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </div>
              <button
                className="bg-red-600 text-white px-3 cursor-pointer hover:opacity-50"
                onClick={() => {
                  cancelBooking(service.bookingId);
                }}
              >
                {"Cancel"}
              </button>
            </div>
          );
        })}
        {!loading.getData && !services.length && (
          <div className="h-[50vh] w-full flex items-center justify-center">
            <p className="text-6xl">There is no Data</p>
          </div>
        )}
        {loading.getData && (
          <div className="h-[50vh] flex items-center w-full justify-center">
            <img src="/loading.svg" className="animate-spin block " alt="" />
          </div>
        )}
      </div>
    </section>
  );
}

export default Booking;
