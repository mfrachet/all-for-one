export const saveChart = async (chartId: string) => {
  const response = await fetch(`http://localhost:3000/charts/${chartId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
