import { Alert, AlertColor, alpha, Button, Container, CssBaseline, FormControl, Grid, InputBase, InputLabel, MenuItem, Pagination, PaginationItem, PaginationRenderItemParams, Select, SelectChangeEvent, Slide, SlideProps, Snackbar, styled, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../../models/product.interface';
import { ResponseData } from '../../models/response.interface';
import ProductService from '../../services/product.service';
import { ProductInner } from './productInner';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionRight(props: TransitionProps) {
  return <Slide {...props} direction="right" />;
}

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 0, 1, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%'
  },
}));

export const ProductList = () => {

  const productService = new ProductService();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState<ResponseData<Product>>(Object);
  const [isLoading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(searchParams.get('search'));
  const [reload, setReload] = useState(true);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

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
  }, [searchParams, reload]);

  const setPaginationParams = (item: PaginationRenderItemParams) => {
    let url = new URL(window.location.origin);
    if (item.page !== 1 && item.page !== 0) {
      url.searchParams.append('page', item.page.toString());
    }
    let search = searchParams.get("search");
    if (search !== null)
      url.searchParams.append('search', search);
    let orderingName = searchParams.get("orderingName");
    if (orderingName !== null)
      url.searchParams.append('orderingName', orderingName);
    let orderingAsc = searchParams.get("orderingAsc");
    if (orderingAsc !== null)
      url.searchParams.append('orderingAsc', orderingAsc);
    return url.search;
  }

  const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setSearchInput(value);
    if (value === '')
      searchParams.delete('search');
    else
      searchParams.set('search', value);

    let page = searchParams.get("page");
    if (page !== null)
      searchParams.set('page', '1');

    setSearchParams(searchParams)
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    if (event.target.value === undefined) {
      searchParams.delete('orderingName');
      searchParams.delete('orderingAsc');
    } else {
      let value = +event.target.value;
      switch (value) {
        case 1:
          searchParams.set('orderingName', 'Name');
          searchParams.set('orderingAsc', 'true');
          break;
        case 2:
          searchParams.set('orderingName', 'Name');
          searchParams.set('orderingAsc', 'false');
          break;
        case 3:
          searchParams.set('orderingName', 'Category');
          searchParams.set('orderingAsc', 'true');
          break;
        case 4:
          searchParams.set('orderingName', 'Category');
          searchParams.set('orderingAsc', 'false');
          break;
        default:
          break;
      }
    }
    setSearchParams(searchParams);
  }

  const setInitInputSelect = (): string | undefined => {
    let orderingName = searchParams.get("orderingName");
    let orderingAsc = searchParams.get("orderingAsc");

    if (orderingName === null || orderingAsc === null) {
      return undefined;
    }

    let value: string | undefined = undefined;
    if (orderingName === 'Name') {
      if (orderingAsc === 'true')
        value = '1';
      if (orderingAsc === 'false')
        value = '2';
    }
    if (orderingName === 'Category') {
      if (orderingAsc === 'true')
        value = '3';
      if (orderingAsc === 'false')
        value = '4';
    }
    return value;
  }

  const handleDeleteProduct = (deleted: boolean) => {
    setOpen(true);
    if (deleted) {
      setReload(!reload)
      setAlertMessage(`Producto eliminado correctamente`);
      setSeverity('success');
    } else {
      setAlertMessage(`Error: No se pudo eliminar el producto`);
      setSeverity('error');
    }
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={{ marginTop: '2rem' }}>
        <Container fixed>
          <Box marginTop={2}>
            <Button component={Link} to="/nuevo_producto" variant="contained" className='back-primary'>Nuevo producto</Button>
          </Box>
          {
            isLoading ?
              <></>
              :
              <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                <Grid container spacing={2} alignItems='center' justifyContent='center'>
                  <Grid item xs={6}>
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleChangeSearch}
                        value={searchInput}
                      />
                    </Search>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl variant="standard" fullWidth size='small'>
                      <InputLabel id="ordering-lable" className='color-primary'>Ordernar por</InputLabel>
                      <Select
                        labelId="ordering-lable"
                        id="ordering-select"
                        value={setInitInputSelect()}
                        label="ordering"
                        onChange={handleChangeSelect}
                        className='select-primary'
                      >
                        <MenuItem value={undefined}>Ninguno</MenuItem>
                        <MenuItem value={1}>Nombre Asc</MenuItem>
                        <MenuItem value={2}>Nombre Desc</MenuItem>
                        <MenuItem value={3}>Categoría Asc</MenuItem>
                        <MenuItem value={4}>Categoría Desc</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Box justifyContent='center' alignItems='center' textAlign='center' marginTop={2}>
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
                      to={`${setPaginationParams(item)}`}
                      {...item}
                    />
                  )}
                />
              </div>
          }
          <Grid container spacing={2} alignItems='center' justifyContent='center' marginBottom={2}>
            {
              products.data !== undefined ? products.data.map(product => <Grid key={'g' + product.productId} item><ProductInner onDeleteProduct={handleDeleteProduct} product={product} /></Grid>) : (isLoading ? <div>Cargando...</div> : <div>No existen productos</div>)
            }
          </Grid>
        </Container>
      </div>
      <Snackbar open={open} TransitionComponent={TransitionRight} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};