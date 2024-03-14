import { IProduct } from "@/store/slices/processSlice";

const handleAddProduct = (
  productToAdd: IProduct,
  productList: IProduct[]
): IProduct[] => {
  const updatedProductList: IProduct[] = [...productList];
  console.log({ updatedProductList, productToAdd });

  const existingProductIndex = updatedProductList.findIndex(
    (product) => product.id === productToAdd.id
  );
  if (existingProductIndex !== -1) {
    // @ts-ignore
    // Product already exists, increment quantity
    updatedProductList[existingProductIndex].quantity += 1;
  } else {
    // Product doesn't exist, add with quantity 1
    updatedProductList.push({ ...productToAdd, quantity: 1 });
  }

  return updatedProductList;
};

const handleDecraseQuantiy = (
  id: string,
  productList: IProduct[]
): IProduct[] => {
  const updatedProductList: IProduct[] = [...productList];
  console.log({ updatedProductList, id });
  const existingProductIndex = updatedProductList.findIndex(
    (product) => product.id === id
  );
  if (
    existingProductIndex !== -1 &&
    // @ts-ignore
    updatedProductList[existingProductIndex].quantity > 1
  ) {
    // @ts-ignore
    // Product already exists, decrement quantity
    updatedProductList[existingProductIndex].quantity -= 1;
  }

  return updatedProductList;
};

const handleRemoveProduct = (
  id: string,
  productList: IProduct[]
): IProduct[] => {
  const newList = productList.filter((item) => {
    return item.id !== id;
  });
  return newList;
};

export { handleAddProduct, handleDecraseQuantiy, handleRemoveProduct };
