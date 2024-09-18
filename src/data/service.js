const url = "https://food-pos-data.vercel.app";

export const tabName = async () => {
  try {
    const res = await fetch(`${url}/catalog`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getTabContent = async (path) => {
  try {
    const res = await fetch(`${url}/${path}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return error.message;
  }
};
