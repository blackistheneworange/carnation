import { RootState } from "@/lib/store";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material"
import Link from "next/link";
import { useSelector } from "react-redux";

export const ListedCarManage = (props: any) => {
    const deleting = useSelector((state: RootState) => state.car.deleting) as boolean;
    const { brand, model, variant, cost, stock, onPurchase } = props;

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
                Available Stock: {stock}
            </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} href={`/admin/edit-car/${props.id}`} size="small" style={{ width:'100%' }} disabled={deleting}>Edit</Button>
                <Button onClick={() => props.onDelete(props.id)} size="small" style={{ width:'100%' }} disabled={deleting}>Delete</Button>
            </CardActions>
        </Card>
    )
}