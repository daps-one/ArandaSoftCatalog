import { SERVICES_ARANDA } from "./route.providers";
import axios, { AxiosResponse } from 'axios';
import { Category } from "../models/category.interface";

export default class CategoryService {

    private CATEGORIES_URL = SERVICES_ARANDA.URL_SECURE + '/categories';

    getCategories() : Promise<AxiosResponse<Category[]>> {
        return axios.get<Category[]>(this.CATEGORIES_URL);
    }
}