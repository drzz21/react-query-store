import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productActions } from '..';

//creamos este hook, de esta forma la configuracion de esta mutacion la tenemos aqui, por si
//la queremos usar en varios componentes
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (data) => {
			console.log('Product created successfully');
			//llamando esta funcion invalidamos los queries que coincidan
			//con el key que estamos indicando, esto forza volver a pedir el query
			//cuando se muestre una vista donde se esté usando
			//ideal para usar al termino de una mutacion para solicitar
			//la informacion mas actualizada
			//en este caso le mandamos el key exacto, pero podriamos
			//hacer mas dinamico o personalizado
			queryClient.invalidateQueries({
				queryKey: ['products', { 'filterKey': data.category }],
			});
		},
		onSettled: () => {
			console.log('Product creation process completed');
		},
	});

	return mutation;
};
