import { useEffect, useState } from "react";
import type { Category, Service, Slot } from "../../../types/models";
import { useParams } from "react-router-dom";
import SlotsApi from "../../../apis/slotsApi";
import { formatDateForInput, formattedDate } from "../../../utils/functions";
import { Axios, AxiosError } from "axios";
import BookingApi from "../../../apis/bookingApi";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
type ServiceCat = Service & {
  category: Category;
};
function Slots({ service }: { service: ServiceCat }) {
  const { id } = useParams();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [clickedSlot, setClickedSlot] = useState<Slot>();
  const [open, setOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const userId = user.user?.id || "";
  const getSlots = async () => {
    try {
      const res = await SlotsApi.getServiceSlot(id || "");
      setSlots(res.data);
    } catch (e) {}
  };
  const handleDelete = async (id: string) => {
    try {
      const res = await SlotsApi.deleteSlot(id || "");
      getSlots();
    } catch (e) {}
  };
  const handleBooking = async (slotId: string) => {
    try {
      await BookingApi.createBooking({ slotId, userId });
      getSlots();
    } catch (e) {}
  };
  useEffect(() => {
    getSlots();
  }, []);
  return (
    <>
      <div className="max-h-[200px] overflow-y-scroll">
        {clickedSlot && (
          <SlotDialog
            updateSlots={getSlots}
            setOpen={setOpen}
            slot={clickedSlot}
            open={open}
          />
        )}
        {slots.map((slot, index) => {
          const fromDate = new Date(slot.startTime);
          const toDate = new Date(slot.endTime);
          return (
            <div>
              <div key={slot.id} className="flex justify-between items-center">
                <div className=" text-sm">
                  <p>from: {formattedDate(fromDate)}</p>
                  <p>to: {formattedDate(toDate)}</p>
                </div>
                <div className="flex gap-1 [&_button]:cursor-pointer [&_button]:border-1 [&_button]:hover:bg-gray-400 [&_button]:rounded-sm [&_button]:p-[3px_8px]  items-center">
                  {!slot.isBooked ? (
                    <>
                      {user.user?.id != service?.providerId && (
                        <button
                          onClick={(e) => {
                            handleBooking(slot.id || "");
                          }}
                        >
                          Book
                        </button>
                      )}
                      {user.user?.role == "PROVIDER" &&
                        user.user.id == service.providerId && (
                          <button
                            onClick={(e) => {
                              setClickedSlot(slot);
                              setOpen(true);
                            }}
                          >
                            {" "}
                            edit
                          </button>
                        )}
                      {user.user?.role == "PROVIDER" &&
                        user.user.id == service.providerId && (
                          <img
                            onClick={() => handleDelete(slot.id || "")}
                            src="/delete.svg"
                            className="cursor-pointer hover:opacity-50"
                            alt=""
                          />
                        )}
                    </>
                  ) : (
                    <h1 className="cursor-pointer ml-auto w-fit block border-1 mt-2 bg-gray-400 rounded-sm p-[3px_8px]">
                      Booked
                    </h1>
                  )}
                </div>
              </div>
              {index != slots.length - 1 && (
                <div className="bg-gray-400 w-full h-[.4px]"></div>
              )}
            </div>
          );
        })}
        {!slots.length && (
          <p className="text-gray-400">there is no slots available</p>
        )}
      </div>
      {user.user?.role == "PROVIDER" && user.user.id == service?.providerId && (
        <button
          onClick={() => {
            setClickedSlot({ endTime: "", serviceId: id || "", startTime: "" });
            setOpen(true);
          }}
          className="cursor-pointer ml-auto w-fit block border-1 mt-2 hover:bg-gray-400 rounded-sm p-[3px_8px]"
        >
          Add
        </button>
      )}
    </>
  );
}

export default Slots;
const SlotDialog = ({
  slot,
  setOpen,
  updateSlots,
  open,
}: {
  slot: Slot;
  updateSlots: () => void;
  open: boolean;
  setOpen: (e: boolean) => void;
}) => {
  const [date, setDate] = useState<{ from: string; to: string }>({
    from: slot.startTime,
    to: slot.endTime,
  });
  const [errors, setErrors] = useState<{
    endTime: string;
    startTime: string;
    conflict: string;
  }>({
    endTime: "",
    startTime: "",
    conflict: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setDate({
      from: slot.startTime,
      to: slot.endTime,
    });
  }, [slot]);
  const saveDate = async () => {
    try {
      setLoading(true);
      if (slot.id) {
        await SlotsApi.updateSlot({
          ...slot,
          endTime: date.to,
          startTime: date.from,
        });
      } else {
        await SlotsApi.createSlot({
          ...slot,
          endTime: date.to,
          startTime: date.from,
        });
      }
      setOpen(false);
      updateSlots();
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.status == 400) {
          setErrors(e.response?.data);
        }
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setErrors({ endTime: "", startTime: "", conflict: "" });
  }, [date]);
  if (!open) return;
  return (
    <div className=" fixed p-10 w-[50%]  h-[40%] translate-x-[50%] border-1 rounded-md bg-white translate-y-[60%] top-0 left-0">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="from">From:</label>
          <input
            form="from"
            type="datetime-local"
            onChange={(e) =>
              setDate((prev) => ({ ...prev, from: e.target.value }))
            }
            value={formatDateForInput(new Date(date.from))}
          />
          {errors.startTime && (
            <span className="text-sm text-red-600">{errors.startTime}</span>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="to">To</label>
          <input
            id="to"
            type="datetime-local"
            onChange={(e) => {
              setDate((prev) => ({ ...prev, to: e.target.value }));
              console.log(e.target.value);
            }}
            value={formatDateForInput(new Date(date.to))}
          />
          {errors.endTime && (
            <span className="text-sm text-red-600">{errors.endTime}</span>
          )}
        </div>
      </div>
      {errors.conflict && (
        <span className="text-sm text-red-600">{errors.conflict}</span>
      )}
      <button
        onClick={(e) => saveDate()}
        className="w-full mt-10 disabled:opacity-50 text-white rounded-sm p-1 cursor-pointer hover:bg-blue-700 bg-blue-500"
      >
        {loading ? "loading >>>>>>>" : "Save"}
      </button>
      <button
        disabled={loading}
        onClick={() => setOpen(false)}
        className="w-full mt-1  rounded-sm p-1 cursor-pointer hover:bg-gray-300 border-[.5px]"
      >
        Cancel
      </button>
    </div>
  );
};
