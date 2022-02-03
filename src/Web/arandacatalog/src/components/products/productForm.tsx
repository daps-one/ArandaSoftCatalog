import { useParams } from "react-router-dom";
import { Product } from "../../models/product.interface";

export const ProductForm = () => {
    const params = useParams();
    return (
        <>Formulario {params.id === undefined ? 'Chupelo' : params.id}</>
    )
};
