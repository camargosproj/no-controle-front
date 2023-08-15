export const createQueryString = (data: any) => {
  if (!data) return "";
  const params = new URLSearchParams();

  Object.entries(data).forEach(([name, value]) => {
    params.set(name, value as string);
  });

  return params.toString();
};
