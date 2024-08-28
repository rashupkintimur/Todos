export function formatDate(date: Date) {
  const dayOfMonth = date.getDate();
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
  const year = date.getFullYear();

  return dayOfMonth + ":" + month + ":" + year;
}
