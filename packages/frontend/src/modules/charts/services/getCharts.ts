export const getCharts = async () => {
  const response = await fetch(`http://localhost:3000/charts`);

  return response.json();
};
