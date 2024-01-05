import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

// Style for the modal box
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2, // You can adjust the border-radius as needed
};

const PopupModal = ({ open, setOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleClose}>
                            <CloseIcon />
                        </Button>
                    </Box>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
                        Login
                    </Typography>
                    <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={() => navigate('/student/login')}>Student Login</Button>
                    <Button fullWidth variant="outlined" color="secondary" onClick={() => navigate('/teacher/login')}>Teacher Login</Button>
                    <Typography variant="body2" sx={{ my: 2, textAlign: 'center' }}>
                        Don't have an account?
                        <Button color="primary" onClick={() => navigate('/teacher/SignUp')}>Sign up now!</Button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}

export default PopupModal
