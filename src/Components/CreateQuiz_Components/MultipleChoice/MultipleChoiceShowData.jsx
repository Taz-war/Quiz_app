import { Box, Card, Collapse, Grid, IconButton, Typography } from '@mui/material'
import BorderColorTwoToneIcon from "@mui/icons-material/BorderColorTwoTone";
import React from 'react'

const MultipleChoiceShowData = ({ i, quizzes }) => {
    console.log({i})
  return (
    <Box>
        <Collapse ></Collapse>
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
                      {
                          <Typography fontSize={"x-large"} fontWeight={"bolder"}>
                              {`${i + 1} . ${quizzes.QuestionTitle}`}
                          </Typography>
                      }
                      {quizzes.Options.map((data, i) => (
                          <Typography key={i} ml={3}>
                              <b>{`${String.fromCharCode(i + 65)} .`}</b> {` ${data}`}
                          </Typography>
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

export default MultipleChoiceShowData
