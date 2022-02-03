import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Product } from '../../models/product.interface';
import { Link } from 'react-router-dom';
import ProductService from '../../services/product.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductInner = (params: { product: Product, onDeleteProduct: ((deleted: boolean) => void) }) => {

  const productService = new ProductService();

  const handleClick = () => {
    productService.deleteProduct(params.product.productId ?? 0)
      .then(() => {
        params.onDeleteProduct(true);
      })
      .catch(() => {
        params.onDeleteProduct(false);
      });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="auto"
        image={'data:image/png;base64,' + params.product.image}
        alt=""
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {params.product.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Categoría: {params.product.category?.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Descripción: {params.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} to={'/editar_producto/' + params.product.productId} className='color-primary' size="small" title='Editar'><EditIcon /></Button>
        <Button size="small" onClick={handleClick} className='color-primary' title='Eliminar'><DeleteIcon /></Button>
      </CardActions>
    </Card>
  );
};
