import prisma from "./src/v1/config/db";
import SlotService from "./src/v1/services/slots.services";

const run = async () => {
  const res = await SlotService.getSlotByService("cmehbu93n0001urr8vwibyj87");
  console.log(res);
  console.log("it's finished");
};
run();
