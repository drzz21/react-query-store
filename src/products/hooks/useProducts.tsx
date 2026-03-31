import { useQuery } from '@tanstack/react-query';
import { productActions } from '..';

interface Options {
	filterKey?: string;
}

//creamos el hook para consultar los productos, recibimos el filterkey
//que usaremos para filtrarlos, destructuramos lo que retorna
//y agregamos su configuracion, querykey, funcion y stale time y lo exportamos
export const useProducts = ({ filterKey }: Options) => {
	const {
		isLoading,
		isError,
		error,
		data: products = [],
		isFetching,
	} = useQuery({
		queryKey: ['products', { filterKey }],
		queryFn: () => productActions.getProducts({ filterKey }),
		staleTime: 1000 * 60 * 60,
	});

	return {
		isLoading,
		isError,
		error,
		products,
		isFetching,
	};
};
