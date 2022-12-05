import httpReq from "./axiosInstance";

export const handleDelete = async (
  products: IProduct[],
  setProducts: (state: IProduct[]) => void,
  id: string | undefined,
  end_point: string
): Promise<void> => {
  const cnfDel: boolean = window.confirm("Are you sure ?");

  if (cnfDel) {
    try {
      const data: any = await httpReq.delete(`/api/${end_point}`);
      if (data.success) {
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
