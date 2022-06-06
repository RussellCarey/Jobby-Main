export const convertDateToUnix = (date: string) => {
  return Math.floor(new Date(date).getTime() / 1000);
};
