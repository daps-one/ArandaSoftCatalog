import { ProductForm } from "./components/products/productForm";
import { ProductDetail } from "./components/products/productDetail";
import { ProductList } from "./components/products/productList";

export const routes = [
    { path: '/', component: <ProductList /> },
    { path: '/nuevo_producto', component: <ProductForm /> },
    { path: '/editar_producto/:id', component: <ProductForm />},
    { path: '/producto/:id', component: <ProductDetail /> },
    { path: '*', component: <div>ERROR</div> }
]