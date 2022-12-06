import { useEffect, useState } from "react";

export default function ProductPagination(items = [], itemsPerPage) {
  console.log(items);

  return { handlePageClick, pageCount, currentItems };
}
