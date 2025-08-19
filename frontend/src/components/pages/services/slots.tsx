import { useEffect, useState } from "react";
import type { Category, Service, Slot } from "../../../types/models";
import { useParams } from "react-router-dom";
import SlotsApi from "../../../apis/slotsApi";
import { formatDateForInput, formattedDate } from "../../../utils/functions";
type ServiceCat = Service & {
  category: Category;
};
function Slots({ service }: { service: ServiceCat }) {
  const { id } = useParams();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [clickedSlot, setClickedSlot] = useState<Slot>();
  const [open, setOpen] = useState<boolean>(false);
  const getSlots = async () => {
    try {
      const res = await SlotsApi.getServiceSlot(id || "");
      setSlots(res.data);
    } catch (e) {}
  };
  useEffect(() => {
    getSlots();
  }, []);
  return (
    <div>
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
                {!slot.isBooked && (
                  <>
                    <button>Book</button>
                    <button
                      onClick={(e) => {
                        setClickedSlot(slot);
                        setOpen(true);
                      }}
                    >
                      {" "}
                      edit
                    </button>
                    <img src="/delete.svg" alt="" />
                  </>
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
    from: slot.endTime,
    to: slot.endTime,
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
      const res = await SlotsApi.updateSlot({
        ...slot,
        endTime: date.to,
        startTime: date.from,
      });
      setOpen(false);
      updateSlots();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  if (!open) return;
  return (
    <div className=" fixed p-10 w-[50%]  h-[50%] translate-x-[50%] border-1 rounded-md bg-white translate-y-[50%] top-0 left-0">
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
        </div>
      </div>

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
