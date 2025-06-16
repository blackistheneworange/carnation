import { RootState } from "@/lib/store";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import { useSelector } from "react-redux";

export const ListedCarInfo = (carInfo: any) => {
    const purchasing = useSelector((state: RootState) => state.car.purchasing) as boolean;
    const { brand, model, variant, cost, safetyRating, stock, onPurchase } = carInfo;

    return (
        <Card variant="outlined">
            <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                {brand}
            </Typography>
            <Typography variant="h5" component="div">
                {model}
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{variant}</Typography>
            <Typography variant="body1">
                INR {cost}
            </Typography>
            <Typography variant="caption" mt={2}>
                Safety Rating {safetyRating}
            </Typography>
            </CardContent>
            <CardActions>
            <Button onClick={() => onPurchase(carInfo)} size="small" style={{ width:'100%' }} disabled={stock < 1 || purchasing}>{stock < 1 ? 'Out of stock' : 'Buy Now'}</Button>
            </CardActions>
        </Card>
    )
}