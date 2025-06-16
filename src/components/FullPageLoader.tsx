import { CircularProgress } from "@mui/material";

export const FullPageLoader = () => (
    <div style={{ height:'100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
    </div>
)