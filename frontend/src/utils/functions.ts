export const formattedDate = (now: Date) => {
  return (
    `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ` +
    `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
  );
};
export function formatDateForInput(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}