export const getMe = () => {
  if (!localStorage.getItem("jwt")) {
    throw new Error("User not authenticated");
  }

  return Promise.resolve({ name: "Marvin" });
};
