import { useMutation } from '@tanstack/react-query';
import { productActions } from '..';

//creamos este hook, de esta forma la configuracion de esta mutacion la tenemos aqui, por si
//la queremos usar en varios componentes
export const useProductMutation = () => {
	const mutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: () => {
			console.log('Product created successfully');
		},
		onSettled: () => {
			console.log('Product creation process completed');
		},
	});

	return mutation;
};
