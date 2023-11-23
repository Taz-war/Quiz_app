import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { CreateQuizContex } from '../../Context_Api/CreateQuizStateProvider';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: '2px solid',
    boxShadow: 24,
    p: 4,
    borderRadius:2,
  };


const DeleteModal = ({openDeleteModal,setOpenDeleteModal}) => {
    const { id } = useContext(CreateQuizContex);

    ////delete quiz///
  const handleDelete =async()=>{
    try {
      const response = await fetch(`http://localhost:5000/questionSet/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      // setErrorMessage(error.message);
    }
  }
    return (
        <div>
          <Modal
            open={openDeleteModal}
            onClose={()=>setOpenDeleteModal(false)}
          >
            <Box sx={style}>
              <Typography variant="h6" component="h2" mb={2} >
                Are you sure you want to Delete the quiz?
              </Typography>
              <Box display={'flex'} justifyContent={"space-around"}>
                <Button variant='outlined' color="success"onClick={()=>setOpenDeleteModal(false)}>Cancel</Button>
                <Button variant='contained' color="error" onClick={()=>handleDelete()}>Delete</Button>
              </Box>
            </Box>
          </Modal>
        </div>
      );
}

export default DeleteModal