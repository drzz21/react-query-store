import { ProductList, useProducts } from '..';

export const MensPage = () => {
	//para las vistas de ropa de hombre y mujer
	//es la misma funcionalidad, solamente, agregamos el filtro
	//para que no retorne todos los productos, solo los que queremos filtrar
	const { isLoading, products } = useProducts({
		filterKey: "men's clothing",
	});
	return (
		<div className="flex-col">
			<h1 className="text-2xl font-bold">Productos para hombres</h1>

			{isLoading && <p>Cargando productos...</p>}

			<ProductList products={products} />
		</div>
	);
};
