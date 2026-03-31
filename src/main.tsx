import React from 'react';
import ReactDOM from 'react-dom/client';

import { NextUIProvider } from '@nextui-org/react';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.tsx';

import './index.css';
import { TanStackProvider } from './plugins/TanStackProvider.tsx';

//importamos nuestro componente de tanstack
//y envolvemos la aplicacion en ese componente
//ese ya tiene toda la configuracion de los querys
//entonces solo la enovlvemos y ya funcionará

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<TanStackProvider>
			<NextUIProvider>
				<main className="dark text-foreground bg-background">
					<RouterProvider router={router} />
				</main>
			</NextUIProvider>
		</TanStackProvider>
	</React.StrictMode>,
);
