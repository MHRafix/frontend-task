export const fetcher = async (endPoint, userData) => {
  const user = userData.user_information;
  const info = JSON.parse(user);
  const res = await fetch(
    `https://frontend-task-psi.vercel.app/api/${endPoint}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${info.accessToken}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
