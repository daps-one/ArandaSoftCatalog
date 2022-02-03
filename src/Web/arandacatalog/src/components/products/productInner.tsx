import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Product } from '../../models/product.interface';

export const ProductInner = (params: { product: Product }) => {
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
        <Typography variant="body2" color="text.secondary">
          {params.product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Editar</Button>
        <Button size="small">Eliminar</Button>
      </CardActions>
    </Card>
    // <div key={params.product.productId}>{params.product.name}</div>
  );
};
