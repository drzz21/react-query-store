import { productsApi } from '../api/productsApi';
//importamos como tipo por si ts no lo infiere
import { type Product } from '../interfaces/product';

interface GetProductsOptions {
	filterKey?: string;
}

//sleep para hacer la desmotracion del tiempo de espera de react query
export const sleep = (seconds: number = 0): Promise<boolean> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, seconds * 1000);
	});
};

//creamos nuestro primer servicio, que consume los productos de nuestra api
//de momento sin los params, solo para obtener todos los productos, pero vamos definiendo
//ya el filterkey que usaremos para filtrar nuestros productos
export const getProducts = async ({ filterKey }: GetProductsOptions) => {
	//agregamos el sleep para que tarde en responder y validar
	//que toma el caché
	// await sleep(2);

	//creamos una variable para el filtrado, que agregaremos
	//dinamicamente a nuestra consulta, ya que así funciona
	//json server
	const filterUrl = filterKey ? `category=${filterKey}` : '';

	const { data } = await productsApi.get<Product[]>(`/products?${filterUrl}`);
	return data;
};

//creamos la accion que consultará la informacion de un producto
//en base al id que le enviemos
export const getProductById = async (id: number): Promise<Product> => {
	// await sleep(2);

	const { data } = await productsApi.get<Product>(`/products/${id}`);
	return data;
};

interface ProductLike {
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

//creamos nuestra funcion para insertar productos
//recibimos productlike, que es algo parecido a un producto pero sin todos
//los valores que tiene el producto creado
export const createProduct = async (product: ProductLike) => {
	//ponemos el delay de 2 segundos
	// await sleep(2);
	//de este modo se hace la insercion en la api de json server, enviando el producto en el body
	//de la req
	const { data } = await productsApi.post<Product>('/products', product);
	return data;
};
