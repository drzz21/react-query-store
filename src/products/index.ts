
export { productsApi } from './api/productsApi';

export { ProductCard } from './components/ProductCard';
export { ProductList } from './components/ProductList';

export { useProducts } from './hooks/useProducts';
export { useProduct } from './hooks/useProduct';
export { usePrefetchProduct } from './hooks/usePrefetchProduct';

// ojo aqui, si solo exportamos una interfaz, exportamos como tipo
export type { Product} from './interfaces/product';


export { StoreLayout } from './layout/StoreLayout';


export { CompleteListPage } from './pages/CompleteListPage';
export { MensPage } from './pages/MensPage';
export { ProductById } from './pages/ProductById';
export { NewProduct } from './pages/NewProduct';
export { WomensPage } from './pages/WomensPage';

//exportamos todas las funciones de actions
//para usarlas en donde sea necesario
export * as  productActions from './services/actions';