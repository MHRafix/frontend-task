import axios from "axios";
import Cookies from "js-cookie";

export const handleDelete = async (
  products: IProduct[],
  setProducts: (state: IProduct[]) => void,
  id: string | undefined,
  end_point: string
): Promise<void> => {
  const cnfDel: boolean = window.confirm("Are you sure ?");
  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user = userCookie && JSON.parse(userCookie);

  if (cnfDel) {
    try {
      const data: any = await axios.delete(`/api/${end_point}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log(data);
      if (data?.success) {
        const rest = products.filter((p: IProduct) => id !== p._id);
        setProducts(rest);
      } else {
        alert("Faild to delete product!");
      }
    } catch (err: any) {
      alert(err.message);
    }
  }
};
