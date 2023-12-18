import { Container, Typography } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <div>
        <Container sx={{ bgcolor: "#DFEAF3", p: 4, textAlign: "left" }}>
        <Typography variant="h5">Loading....</Typography>
      </Container>
    </div>
  )
}

export default Loader