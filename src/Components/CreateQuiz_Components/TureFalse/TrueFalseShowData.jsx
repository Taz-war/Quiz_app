import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material'
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import React from 'react'

const TrueFalseShowData = ({ i, item }) => {
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
                      <Typography fontSize={"x-large"} fontWeight={"bolder"} mb={2}>
                          {`${i + 1} . ${item.QuestionTitle}`}
                      </Typography>
                      <Button
                          variant="contained"
                          color={`${item.Answer === true ? "success" : "error"
                              }`}
                      >
                          {item.Answer === true ? "True" : "False"}
                      </Button>
                  </Grid>
                  <Grid item xs={2} textAlign={'right'}>
                      <IconButton >
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

export default TrueFalseShowData
