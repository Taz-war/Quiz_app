import { Box, Button, Card, Grid, IconButton, Typography } from '@mui/material'
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import React from 'react'

const ShortQuestionShowData = ({ key, quizzes }) => {
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
                      <Typography fontSize={"x-large"} fontWeight={"bolder"}>{`${key + 1} . ${quizzes.QuestionTitle}`}</Typography>
                      {quizzes.Answer.length > 0 &&
                          quizzes.Answer.map((data, i) => (
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

export default ShortQuestionShowData
