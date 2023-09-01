export const createQueryString = (data: any) => {
  if (!data) return "";
  const params = new URLSearchParams();

  Object.entries(data).forEach(([name, value]) => {
    params.set(name, value as string);
  });

  return params.toString();
};

export const createQueryUrl = (query) => {
  let querySearch;

  const month = query.get("month");
  const year = query.get("year");

  if (month && year) {
    querySearch = {
      month,
      year,
    };
  } else {
    return "";
  }

  const url = createQueryString(querySearch);

  return `?${url}`;
};

// Delay function for testing
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
