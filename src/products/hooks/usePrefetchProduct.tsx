import { useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

export const usePrefetchProduct = () => {
	const queryClient = useQueryClient();
	//hacemos la configuracion de nuestro prefetch
	//para lanzar la consulta antes de tiempo y tener la informacion lista

	const prefetchProduct = async (id: number) => {
		queryClient.prefetchQuery({
			queryKey: ['product', id],
			queryFn: () => productActions.getProductById(id),
		});
	};

	return prefetchProduct;
};
