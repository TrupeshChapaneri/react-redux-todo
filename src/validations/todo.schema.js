import Joi from "joi";

const todoSchema = Joi.object({
  title: Joi.string().trim().required().min(5).max(35).label("Todo Title"),
  description: Joi.string()
    .trim()
    .required()
    .min(10)
    .max(130)
    .label("Todo Description"),
});

export { todoSchema };
