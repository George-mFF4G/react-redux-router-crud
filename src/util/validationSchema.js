import * as yup from 'yup';

export const postSchema = yup.object({
  title: yup.string()
  .min(2,"Too short")
  .max(50,"Too long")
  .required("required"),
  description: yup.string()
  .required("required"),
});