import { Alert, AlertColor, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Category } from '../../models/category.interface';
import { Product } from "../../models/product.interface";
import CategoryService from '../../services/category.service';
import ProductService from '../../services/product.service';
import { NotFound } from '../shared/notFound';

export const ProductForm = () => {
    const params = useParams();
    const navigate = useNavigate();
    const productService = new ProductService();
    const categorytService = new CategoryService();
    const id = params.id;
    const title = params.id === undefined ? 'Nuevo producto' : 'Editar producto ' + params.id
    const formInput = useRef<HTMLFormElement>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<Product | null>(null);
    const [fileName, setFileName] = useState('');
    const [isDisabled, setDisabled] = useState(true);
    const [tempName, setTempName] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [tempCategory, setTempCategory] = useState('');
    const [tempImage, setTempImage] = useState<string | undefined>('');
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);
    const [isLoading, setLoading] = useState(true);



    useEffect(() => {
        categorytService.getCategories().then(result => {
            setCategories(result.data);
        });
        if (id !== undefined) {
            productService.getProduct(+id).then(result => {
                setProduct(result.data);
                setTempName(result.data.name ?? '');
                setTempDescription(result.data.description ?? '');
                setTempCategory(result.data.categoryId?.toString() ?? '');
                setTempImage(result.data.image ?? '');
                setLoading(false);
                console.log(formInput.current)
                if (formInput.current) {
                    setDisabled(!formInput.current.checkValidity());
                }
            }).catch(() => {
                setProduct(null);
            });
        } else {
            setLoading(false);
        }
    }, [])

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        console.log(value.split(/(\\|\/)/g).pop())
        setFileName(value.split(/(\\|\/)/g).pop() ?? '');
        if (event.target) {
            var files = event.target.files;
            if (files) {
                var file = files[0];
                var reader = new FileReader();
                reader.onloadend = function () {
                    let image = reader.result?.toString().split(',')[1]
                    setTempImage(image);
                    setProduct({
                        image: image,
                        ...product
                    })
                }
                reader.readAsDataURL(file);
            }
        }
        if (formInput.current)
            setDisabled(!formInput.current.checkValidity());
    }

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (event.currentTarget.checkValidity()) {
            setProduct({
                name: tempName,
                description: tempDescription,
                categoryId: +tempCategory,
                ...product
            });
            if (product) {
                var promise: Promise<AxiosResponse<Product, any>>;
                var text = '';
                if (id === undefined) {
                    text = 'creado';
                    promise = productService.insertProduct({
                        name: tempName,
                        description: tempDescription,
                        categoryId: +tempCategory,
                        image: tempImage
                    });
                } else {
                    text = 'modificado';
                    promise = productService.updateProduct(+id, {
                        name: tempName,
                        description: tempDescription,
                        categoryId: +tempCategory,
                        image: tempImage
                    });
                }
                promise
                .then(() => {
                    setOpen(true);
                    setAlertMessage(`Producto ${text} correctamente`);
                    setSeverity('success');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }).catch(() => {
                    setOpen(true);
                    setAlertMessage(`Error: Producto NO ${text}`);
                    setSeverity('error');
                });
            }
        }
    }

    const handleChangeInputs = () => {
        if (formInput.current)
            setDisabled(!formInput.current.checkValidity());
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ marginTop: '2rem' }}>
                <Container>
                    {
                        isLoading ? <div style={{ textAlign: 'center' }}>Cargando...</div> :
                            (id !== undefined && product == null ?
                                <NotFound />
                                :
                                <>
                                    <Typography variant="h5" textAlign='center' marginBottom={2}>{title}</Typography>
                                    <form ref={formInput} onSubmit={handleSubmitForm} noValidate>
                                        <Grid container spacing={2} alignItems='center' justifyContent='center'>
                                            <Grid item xs={12} sm={10} md={8} lg={7}>
                                                <TextField
                                                    required
                                                    size='small'
                                                    style={{ width: "100%" }}
                                                    type="text"
                                                    label="Nombre"
                                                    variant="filled"
                                                    value={tempName}
                                                    name='name'
                                                    onChange={(event) => { setTempName(event.target.value); handleChangeInputs() }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={8} lg={7}>
                                                <TextField
                                                    required
                                                    size='small'
                                                    multiline
                                                    rows={3}
                                                    style={{ width: "100%" }}
                                                    type="text"
                                                    label="Descripción"
                                                    variant="filled"
                                                    value={tempDescription}
                                                    name='description'
                                                    onChange={(event) => { setTempDescription(event.target.value); handleChangeInputs() }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={8} lg={7}>
                                                <FormControl variant="filled" fullWidth size='small'>
                                                    <InputLabel id="category-label" className='color-primary'>Categoría</InputLabel>
                                                    <Select
                                                        required
                                                        labelId="category-label"
                                                        id="category-select"
                                                        label="category"
                                                        value={tempCategory}
                                                        name='categoryId'
                                                        className='select-primary'
                                                        onChange={(event) => { setTempCategory(event.target.value.toString()); handleChangeInputs() }}
                                                    >
                                                        <MenuItem value={undefined}>Ninguno</MenuItem>
                                                        {
                                                            categories.map(category => <MenuItem value={category.categoryId}>{category.description}</MenuItem>)
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={8} lg={7}>
                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    className='back-primary'
                                                >
                                                    Subir imagen
                                                    <input
                                                        required={id === undefined}
                                                        accept='image/*'
                                                        type="file"
                                                        hidden
                                                        name='image'
                                                        onChange={(event) => { handleChangeFile(event); }}
                                                    />
                                                </Button>
                                                <InputLabel style={{ paddingLeft: '.5rem', display: 'inline-block', verticalAlign: 'middle' }}>{fileName}</InputLabel>
                                            </Grid>
                                            <Grid item xs={12} sm={10} md={8} lg={7}>
                                                <Button
                                                    type='submit'
                                                    disabled={isDisabled}
                                                    variant="contained"
                                                    style={{ width: "100%" }}
                                                    className='back-primary'
                                                >
                                                    Guardar
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </>
                            )
                    }
                </Container>
            </div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </React.Fragment>
    )
};
