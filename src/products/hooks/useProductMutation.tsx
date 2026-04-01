import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Product, productActions } from '..';

//creamos este hook, de esta forma la configuracion de esta mutacion la tenemos aqui, por si
//la queremos usar en varios componentes
export const useProductMutation = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: productActions.createProduct,

		//vamos a hacer una mutacion optimista, esta se hace
		//en la seccion onMutate, ya que queremos que se dispare
		//tan pronto como se llame la mutacion

		onMutate: (product) => {
			console.log('mutando optimistic', product);

			//creamos un producto optimista, que tendrá todo lo que nos retorna
			//la respuesta del back
			//con el agregado de que tambien tendrá el id,
			//ese se asigna del front y no del back entonces
			//agregamos uno random

			//optimistic product
			const optimisticProduct: Product = {
				id: Math.random(),
				...product,
			};
			//almacenar producto en cache
			//al igual que lo hicimos en el commit anterior
			//con la diferencia de que ahora se hace en el momento
			//exacto que se llama la mutacion para no tener que esperar
			//la respuesta del back
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => (old ? [...old, optimisticProduct] : old),
			);

			//exportamos para tener el contexto en el onsucess
			return {
				optimisticProduct,
			};
		},

		onSuccess: (product, variables, context) => {
			console.log('Product created successfully');
			//product, respuesta de la promesa
			//variables, lo que mandamos a la mutacion
			//context, lo que retornamos de la mutacion
			console.log({ product, variables, context });
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
			// queryClient.setQueryData<Product[]>(
			// 	['products', { filterKey: product.category }],
			// 	(old) => (old ? [...old, product] : old),
			// );

			//si todo salio bien, vamos a quitar la querie del producto anterior en caso
			//de que la hayamos consultado, ya que el id que tiene es incorrecto
			queryClient.removeQueries({
				queryKey: ['product',context?.optimisticProduct.id],
				exact: true,
			});

			//con esto reemplazamos el producto optimista
			//por el que realmente se creo desde el backend, si no lo encontramos es porque
			//no se habia creado, entonces no modificamos nada
			queryClient.setQueryData<Product[]>(
				['products', { filterKey: product.category }],
				(old) => {
					if (!old) return [product];

					return old.map((cacheProd) => {
						return cacheProd.id === context?.optimisticProduct.id
							? product
							: cacheProd;
					});
				},
			);
		},
		onSettled: () => {
			console.log('Product creation process completed');
		},
	});

	return mutation;
};
