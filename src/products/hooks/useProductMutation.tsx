import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

//creamos este hook, de esta forma la configuracion de esta mutacion la tenemos aqui, por si
//la queremos usar en varios componentes
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (product) => {
			console.log('Product created successfully');
			//llamando esta funcion invalidamos los queries que coincidan
			//con el key que estamos indicando, esto forza volver a pedir el query
			//cuando se muestre una vista donde se esté usando
			//ideal para usar al termino de una mutacion para solicitar
			//la informacion mas actualizada
			//en este caso le mandamos el key exacto, pero podriamos
			//hacer mas dinamico o personalizado
			// queryClient.invalidateQueries({
			// 	queryKey: ['products', { 'filterKey': data.category }],
			// });

			//de esta forma asignamos manualmente el valor de esta query
			//es otro modo de tener la informacion sin necesidad
			//de invalidar la query, asignandola manualmente
			//aqui lo que se hace es tomar el valor viejo, y concatenar el nuevo
			//en este caso como es un arreglo agregamos el nuevo elemento al final de la lista
			//en caso de que exista, y si no existe, regresamos el viejo
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => (old ? [...old, product] : old),
			);
		},
		onSettled: () => {
			console.log('Product creation process completed');
		},
	});

	return mutation;
};
