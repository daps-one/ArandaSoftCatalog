import { Link, useParams } from 'react-router-dom';

export const ProductDetail = () => {
    const params = useParams();
    return (
        <>
            <h1>
                Producto {params.id}
            </h1>
            <Link to='/'>Productos</Link>
            <Link to='/nuevo_producto'>nuevo</Link>
            <Link to='/editar_producto'>editar</Link>
        </>
    );
};
