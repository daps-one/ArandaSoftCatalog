import { Container, CssBaseline, Grid, Pagination, PaginationItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../models/product.interface';
import { ResponseData } from '../../models/response.interface';
import ProductService from '../../services/product.service';
import { ProductInner } from './productInner';

export const ProductList = () => {

  const productService = new ProductService();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ResponseData<Product>>(Object);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    productService.getProducts({
      page: searchParams.get("page") !== null ? (+searchParams.get("page")! ?? 1) : 1,
      search: searchParams.get("search") ?? undefined,
      orderingName: searchParams.get("orderingName") ?? undefined,
      orderingAsc: searchParams.get("orderingAsc") === null ? undefined : (searchParams.get("orderingAsc") === 'true')
    }).then(result => {
      setProducts(result.data);
      setLoading(false);
    })
  }, [searchParams]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ marginTop: '2rem' }}>
        <Container fixed>
          {
            isLoading ?
              <></>
              :
              <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Box justifyContent='center' alignItems='center' textAlign='center'>
                  <Typography variant="body2" color="text.secondary" >
                    Total: {products.totalRecords} - Filtrados: {products.filteredRecords}
                  </Typography>
                </Box>
                <Pagination
                  count={products.totalRecords !== undefined ? Math.ceil(products.totalRecords / 10) : 1}
                  showFirstButton
                  showLastButton
                  page={searchParams.get("page") !== null ? (+searchParams.get("page")! ?? 1) : 1}
                  renderItem={(item) => (
                    <PaginationItem
                      component={Link}
                      to={`${item.page === 1 ? '/' : `?page=${item.page}`}`}
                      {...item}
                    />
                  )}
                />
              </div>
          }
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            {
              products.data !== undefined ? products.data.map(product => <Grid key={'g' + product.productId} item><ProductInner product={product} /></Grid>) : (isLoading ? <div>Cargando...</div> : <div>No existen productos</div>)
            }
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
};
