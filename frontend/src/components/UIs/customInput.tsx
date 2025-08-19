import type { InputP } from "../../types/inputP";

const CustomInput = ({ key, label, value, onChange, type, error }: InputP) => {
  return (
    <div className="flex flex-col">
      <label className="capitalize font-semibold mb-1" htmlFor={key}>
        {label}
      </label>
      <input
        className="h-[56px] px-3 w-full border-gray-400 rounded-[8px] border-1"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};
export default CustomInput;
