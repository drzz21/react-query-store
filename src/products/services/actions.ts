import { productsApi } from "../api/productsApi";
//importamos como tipo por si ts no lo infiere
import { type Product } from "../interfaces/product";

interface GetProductsOptions {
	filterKey?: string;
}

//creamos nuestro primer servicio, que consume los productos de nuestra api
//de momento sin los params, solo para obtener todos los productos, pero vamos definiendo
//ya el filterkey que usaremos para filtrar nuestros productos
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
	const {data} = await productsApi.get<Product[]>("/products", {
		// params: {
		// 	filterKey,
		// },
	});
	return data;
};
