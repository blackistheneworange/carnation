import { Card, CardContent, Typography } from "@mui/material";

export const PurchasedCarInfo = (carInfo: any) => {
    const { brand, model, variant, purchased_date } = carInfo;

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
                    Purchased on {purchased_date}
                </Typography>
            </CardContent>
        </Card>
    )
}