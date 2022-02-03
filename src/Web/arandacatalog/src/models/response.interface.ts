export interface ResponseData<T> {
    totalRecords: number;
    filteredRecords: number;
    data: T[]
}