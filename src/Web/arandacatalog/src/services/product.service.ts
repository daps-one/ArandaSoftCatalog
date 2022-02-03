import { SERVICES_ARANDA } from "./route.providers";
import axios, { AxiosResponse } from 'axios';
import { RequestData } from "../models/request.interface";
import { ResponseData } from "../models/response.interface";
import { Product } from "../models/product.interface";

export default class ProductService {

    private PRODUCTS_URL = SERVICES_ARANDA.URL_SECURE + '/products';

    getProducts(request: RequestData) : Promise<AxiosResponse<ResponseData<Product>>> {
        return axios.get<ResponseData<Product>>(this.PRODUCTS_URL, {
            params: {
                page: request.page,
                search: request.search,
                orderingName: request.orderingName,
                orderingAsc: request.orderingAsc
            }
        });
    }

    getProduct(productId: number) : Promise<AxiosResponse<Product>> {
        return axios.get<Product>(`${this.PRODUCTS_URL}/${productId}`);
    }

    insertProduct(product: Product) : Promise<AxiosResponse<Product>> {
        return axios.post<Product>(this.PRODUCTS_URL, {
            name: product.name,
            description: product.description,
            image: product.image,
            categoryId: product.categoryId
        });
    }

    updateProduct(productId: number, product: Product) : Promise<AxiosResponse<Product>> {
        return axios.put<Product>(`${this.PRODUCTS_URL}/${productId}`, {
            name: product.name,
            description: product.description,
            image: product.image,
            categoryId: product.categoryId
        });
    }

    deleteProduct(productId: number) : Promise<AxiosResponse> {
        return axios.delete(`${this.PRODUCTS_URL}/${productId}`);
    }
}