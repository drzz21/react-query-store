import { Product, ProductCard, usePrefetchProduct } from '..';

interface Props {
	products: Product[];
}

export const ProductList = ({ products }: Props) => {
	//importamos el prefetch que definimos y lo pasamos como argumento
	//a cada productcard, de nuestro listado de productos
	const prefetchProduct = usePrefetchProduct();

	return (
		<div className="mt-2 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2 justify-center max-w-max">
			{/* iteramos sobre los productos que recibimos por prop */}
			{products.map((product) => (
				<ProductCard
					key={product.id}
					product={product}
					prefetchProduct={prefetchProduct}
				/>
			))}
		</div>
	);
};
