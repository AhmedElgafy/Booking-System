import { useEffect, useState } from "react";
import type { Category } from "../../../types/models";
import CategoryApi from "../../../apis/categoryApi";

function CategoriesDD({
  onChange,
  value,
}: {
  value: string;
  onChange: (e: string) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const getCategories = async () => {
    try {
      const res = await CategoryApi.getAllCategory();
      setCategories(res);
    } catch (e) {}
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {categories.map((category) => {
        return (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        );
      })}
    </select>
  );
}

export default CategoriesDD;
