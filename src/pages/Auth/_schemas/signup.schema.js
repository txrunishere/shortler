import { z } from "zod";

const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`₹]/;

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(5, { message: "Email is too short" })
    .max(255, { message: "Email is too long" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be at most 128 characters" })

    .refine((val) => hasLowercase.test(val), {
      message: "Password must contain at least 1 lowercase letter",
    })
    .refine((val) => hasUppercase.test(val), {
      message: "Password must contain at least 1 uppercase letter",
    })
    .refine((val) => hasNumber.test(val), {
      message: "Password must contain at least 1 number",
    })
    .refine((val) => hasSpecialChar.test(val), {
      message: "Password must contain at least 1 special character",
    }),
  profilePicture: z.instanceof(File, {
    message: "Profile picture must be a valid file.",
  }),
});
