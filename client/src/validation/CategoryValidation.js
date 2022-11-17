// This module contains the validation schema for category
import * as yup from "yup";

export const categorySchema = yup.object().shape({
	CategoryName: yup.string().required(),
});
