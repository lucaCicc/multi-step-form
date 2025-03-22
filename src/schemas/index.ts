import z from "zod";

/**
 *
 */
export const stepOneSchema = z.object({
  name: z.string().min(2, "Name must be at least 2"),
  surname: z.string().min(2, "Name must be at least 2"),
});

/**
 *
 */
export const stepTwoSchema = z.object({
  birthday: z.string().date("Date mist be YYYY-MM-DD"),
  country: z.string().min(2, "Country must be at least 2"),
});

/**
 *
 */
export const stepThreeSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Please enter a phone number of at least 10 characters long"),
  email: z.string().email("Please enter a valid email"),
});

/**
 *
 */
export const initFormDataSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  birthday: z.string().optional(),
  country: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

export const formDataSchema = z.object({
  ...stepOneSchema.shape,
  ...stepTwoSchema.shape,
  ...stepThreeSchema.shape,
});

/**
 *
 */
export type InitFormDataType = z.infer<typeof initFormDataSchema>;

/**
 *
 */
export type FormDataType = z.infer<typeof formDataSchema>;
