import { Alert, Snackbar } from "@mui/material"

export const Toast = ({ open, handleClose, message, type='info' }: any) => (
    <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert variant="filled" severity={type} onClose={handleClose}>
            {message}
        </Alert>
    </Snackbar>
)