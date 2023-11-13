import { Box, Card, Grid, IconButton, Typography } from '@mui/material'
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import React from 'react'

const ShortQuestionShowData = () => {
  return (
    <Box>
          <Card
              sx={{
                  minWidth: 275,
                  bgcolor: "#FFFFF",
                  mt: 2,
                  p: 2,
                  textAlign: "left",
                  mb: 2,
              }}
          >
              <Grid container columns={12} columnSpacing={2}>
                  <Grid item xs={10}>
                      <Typography fontSize={"x-large"} fontWeight={"bolder"}>{`${serialNum + 1} . ${question}`}</Typography>
                      {shortAnswers.length > 0 &&
                          shortAnswers.map((data, i) => (
                              <Button
                                  key={i}
                                  variant="contained"
                                  sx={{
                                      bgcolor: "#E7F6EA", color: "#4EB164", mr: 2, '&:hover': {
                                          bgcolor: "#E7F6EA"
                                      }
                                  }}
                              >
                                  {data}
                              </Button>
                          ))}
                  </Grid>
                  <Grid item xs={2} textAlign={"right"}>
                      <IconButton onClick={() => setOpen(false)}>
                          <BorderColorTwoToneIcon
                              sx={{ bgcolor: "skyblue", color: "white", p: 1 }}
                          />
                      </IconButton>
                  </Grid>
              </Grid>
          </Card>
    </Box>
  )
}

export default ShortQuestionShowData
