export const requestData = async (input: string) => {
  const response = await fetch("http://localhost:3000/compute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  return response.json();
};
