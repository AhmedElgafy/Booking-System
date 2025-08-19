interface InputP {
  key: string;
  label: string;
  value: string | number;
  type: "password" | "text";
  error: string;
  onChange: (e: string | number) => void;
}
export type { InputP };