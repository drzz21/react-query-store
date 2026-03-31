import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { ProductCard } from '../components/ProductCard';

export const ProductById = () => {
	const { id } = useParams<{ id: string }>();

	const { product, isLoading } = useProduct({ id: Number(id) });

	//en esta vista tomamos el parametro id de la url, y con eso hacemos una query
	//para consultar la informacion de dicho producto, en una card

	return (
		<div className="flex-col">
			<h1 className="text-2xl font-bold">Producto</h1>

			{isLoading && <p>Cargando...</p>}

			{product && <ProductCard product={product} fullDescription={true} />}
		</div>
	);
};
