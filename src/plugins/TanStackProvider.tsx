import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//creamoas este componente que tendrá un children 
//este componente envolverá a la aplicacion desde el main, y con ello tendremos la configuracion 
//react query en todos los componentes
//y tambien agregamos las devtools

const queryClient = new QueryClient();

export const TanStackProvider = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};
