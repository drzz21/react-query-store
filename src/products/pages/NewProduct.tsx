import { Button, Image, Input, Textarea } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { productActions } from '..';

interface FormInputs {
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
}

export const NewProduct = () => {
	//declaramos nuestra mutacion, mandando la referencia de la funcion
	//que hace la mutacion, definiendo el onsucess de  dicha funcion QUE ES LO QUE PASARÁ SI ES EXITOSA
	const productMutation = useMutation({
		mutationFn: productActions.createProduct,
		onSuccess: (data) => {
			console.log('Producto creado:', data);
		},
	});

	//hacemos la configuracion de react hook form para enlazar nuestro form
	//y definir la estructura que tendrá,
	//control es para enlazar react hook form en este caso con los formularios
	//de nextui, handleSubmit es para manejar el submit del formulario
	//vamos a importar el watch para observar los cambios en un elemento del form
	const { control, handleSubmit, watch } = useForm<FormInputs>({
		// defaultValues: {
		// 	title: '',
		// 	price: 0,
		// 	description: '',
		// 	category: "men's clothing",
		// 	image: '',
		// },
		//definimos estos valores por defecto para poder comenzar a insertar
		//rapidamente
		defaultValues: {
			title: 'teclado',
			price: 150.22,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, doloremque.',
			category: "men's clothing",
			image: 'https://m.media-amazon.com/images/I/612RsETDnzL._AC_UF894,1000_QL80_.jpg',
		},
	});

	//de esta forma observamos los cambios en un elemento,
	//esta variable siempre tendra el ultimo valor del form de este elemento
	//se hace asi porque rhf no actualiza siempre los valores para
	//optimizar el rendimiento, entonces con watch podemos observar los cambios
	const newImage = watch('image');

	const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
		console.log(data);
		//ejecutamos el mutate de nuestro react query enviando la info
		//del formulario que guardamos con rhf
		productMutation.mutate(data);
	};

	return (
		<div className="w-full flex-col">
			<h1 className="text-2xl font-bold">Nuevo producto</h1>

			<form className="w-full" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-around items-center">
					<div className="flex-col w-[500px]">
						{/* de esta forma usando controller enlazamos los componentes
						del ui de nextui con react hook form */}
						<Controller
							control={control}
							name="title"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									value={field.value}
									onChange={field.onChange}
									className="mt-2"
									type="text"
									label="Titulo del producto"
								/>
							)}
						/>

						<Controller
							control={control}
							name="price"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									value={field.value?.toString()}
									// convertimos esta variable a numero de esta forma
									onChange={(ev) =>
										field.onChange(Number(ev.target.value))
									}
									className="mt-2"
									type="number"
									label="Precio del producto"
								/>
							)}
						/>

						<Controller
							control={control}
							name="image"
							rules={{ required: true }}
							render={({ field }) => (
								<Input
									value={field.value}
									onChange={field.onChange}
									className="mt-2"
									type="url"
									label="Url del producto"
								/>
							)}
						/>

						<Controller
							control={control}
							name="description"
							rules={{ required: true }}
							render={({ field }) => (
								<Textarea
									className="mt-2"
									label="Descripcion del producto"
									value={field.value}
									onChange={field.onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="category"
							rules={{ required: true }}
							render={({ field }) => (
								<select
									value={field.value}
									onChange={field.onChange}
									className="rounded-md p-3 mt-2 bg-gray-800 w-full"
								>
									<option value="men's clothing">
										Men's clothing
									</option>
									<option value="women's clothing">
										Women's clothing
									</option>
									<option value="jewelery">Jewelery</option>
									<option value="electronics">
										Electronics
									</option>
								</select>
							)}
						/>

						<br />
						{/* ojo poner de tipo submit el boton para usarlo */}
						<Button
							type="submit"
							className="mt-2"
							// definimos estos valores y colores dinamicos
							//para que se desactive y muestre otro texto si no se ha resuelto la mutacion
							color={
								productMutation.isPending
									? 'default'
									: 'primary'
							}
							isDisabled={productMutation.isPending}
						>
							{productMutation.isPending
								? 'Creando...'
								: 'Crear producto'}
						</Button>
					</div>

					<div
						className="bg-white rounded-2xl p-10 flex items-center"
						style={{
							width: '500px',
							height: '600px',
						}}
					>
						{/* mostramos siempre el valor actualizado de la imagen */}
						<Image src={newImage} />
					</div>
				</div>
			</form>
		</div>
	);
};
