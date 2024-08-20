export function getTime(startDate: string) {
  const diff = new Date().getTime() - new Date(startDate).getTime();
  return diff / 60000;
}
