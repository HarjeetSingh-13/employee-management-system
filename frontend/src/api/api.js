export const getPosts = async () => {
  const response = await fetch("http://127.0.0.1:8000/posts", {
    method: "GET",
  });
  return await response.json();
};
