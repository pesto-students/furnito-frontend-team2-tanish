import { toast } from "react-toastify";
import axios from "axios";
import { CategoryFormFieldModel } from "../../product/models/catetogy-form-field.model";

const addCategory = async (
  category: CategoryFormFieldModel,
): Promise<any | null> => {
  const response = await toast.promise(
    axios.post(`${process.env.REACT_APP_BASE_API}/category/add`, category),
    {
      pending: "Adding category...",
      success: "Category added successfully",
      error: "Unable to add category",
    },
  );
  return response.data;
};

const categoryService = {
  addCategory,
};

export default categoryService;
