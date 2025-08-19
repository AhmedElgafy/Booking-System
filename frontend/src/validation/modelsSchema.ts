import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string().required("Category name is required"),
});

export const serviceSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed()
    .test("fileType", "Only JPG files are allowed", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.type === "image/jpeg";
      }
      return true;
    })
    .test("fileSize", "Image must be less than 200KB", (value) => {
      if (!value) return true;
      if (value instanceof File) {
        return value.size <= 200 * 1024;
      }
      return true;
    })
    .notRequired(),
  imageUrl: Yup.string().url("Invalid URL").notRequired(),
  providerId: Yup.string().required("Provider is required"),
  categoryId: Yup.string().required("Category is required"),
});

export const slotSchema = Yup.object({
  startTime: Yup.date().required("Start time is required"),
  endTime: Yup.date().required("End time is required"),
  isBooked: Yup.boolean().notRequired(),
  serviceId: Yup.string().required("Service is required"),
});

export const bookingSchema = Yup.object({
  userId: Yup.string().required("User is required"),
  slotId: Yup.string().required("Slot is required"),
});
