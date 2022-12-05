export const fetcher = async (end_point) => {
  const res = await fetch(
    `http://localhost:3000/api/${end_point}`
    // `https://frontend-task-psi.vercel.app/api/${end_point}`
  );
  const data = await res.json();

  return data;
};
