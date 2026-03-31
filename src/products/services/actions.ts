import { productsApi } from '../api/productsApi';
//importamos como tipo por si ts no lo infiere
import { type Product } from '../interfaces/product';

interface GetProductsOptions {
	filterKey?: string;
}

//sleep para hacer la desmotracion del tiempo de espera de react query
const sleep = (seconds:number = 0):Promise<boolean> =>{
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
}

//creamos nuestro primer servicio, que consume los productos de nuestra api
//de momento sin los params, solo para obtener todos los productos, pero vamos definiendo
//ya el filterkey que usaremos para filtrar nuestros productos
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
	//agregamos el sleep para que tarde en responder y validar
	//que toma el caché 
	await sleep(2);

	//creamos una variable para el filtrado, que agregaremos
	//dinamicamente a nuestra consulta, ya que así funciona
	//json server
	const filterUrl = filterKey ? `category=${filterKey}` : '';

	const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
	return data;
};
