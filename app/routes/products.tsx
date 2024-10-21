import { Link, useNavigate } from "@remix-run/react";
import _ from "lodash";
import { useMemo } from "react";
import { formatMoney } from "~/components/utils";
import { useGetAllProducts } from "~/data";

const Products = () => {

  const products = useGetAllProducts(1, 100, "");
  const navigate = useNavigate();

  const productList = useMemo(() => {
    return _(products.data)
      .filter(it => it.status === "ACTIVE")
      .value();
  }, [products.data]);

  return (
    <main className="mt-[--m-header-top] mb-8">
      <div className="flex justify-center mb-8">
        <img
          className="w-full max-w-6xl"
          src="/images/products/productcollection.png"
          alt="Product Collection"
        />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {_.map(productList, (product, index) => (
            <div
              key={index}
              className="bg-[#E8E8E4] shadow-md overflow-hidden p-4"
            >
              <div className="flex justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-[147px] h-[278px] object-cover"
                />
              </div>
              <div className="flex justify-between items-center p-2">
                <p className="font-semibold text-black p-0 m-0">
                  {product.name}
                </p>
                <p className="text-black">{formatMoney(product.price)}</p>
              </div>
              <div className="flex justify-center">
                <button onClick={() => navigate(`/products/${product.productId}`)} className="w-full mt-4 py-2 bg-white text-black rounded hover:bg-slate-300">
                  Chi tiết sản phẩm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Products;
