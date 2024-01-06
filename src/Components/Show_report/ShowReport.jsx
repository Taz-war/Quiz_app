import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrintModal from "../PrintModal/PrintModal";
import { Flex } from "antd";

const ShowReport = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState([]);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({
    instituteName: "",
    courseTitle: "",
    courseCode: "",
    semester: "",
    section: "",
  });

  const getAllQuizes = async () => {

    try {
      const response = await fetch(
        `http://localhost:5000/getReports/${id}`
      );
      const data = await response.json();
      setReport(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
console.log('faky',report)
  useEffect(() => {
    getAllQuizes();
  }, []);

  const [isFormComplete, setIsFormComplete] = useState(false);
  useEffect(() => {
    const checkFormValues = () => {
      // Check if all values are filled (i.e., not null and not empty strings)
      const complete = Object.values(formValues).every(
        (value) => value !== null && value.trim() !== ""
      );
      setIsFormComplete(complete); // Set to true if all values are complete
    };
    checkFormValues();
  }, [formValues]); 

  const downloadPDF = () => {
    const capture = document.querySelector(".downloadPDF");
    html2canvas(capture, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();

      // Calculate the ratio of the pdf to the canvas dimensions
      const canvasRatio = canvas.height / canvas.width;

      let imgWidth = pdfWidth;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      // If the table's height is greater than the PDF page height, then we need to scale it down
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight / canvasRatio; // Scale width based on new height
      }

      // Calculate the position to center the image horizontally (if needed)
      const x = (pdfWidth - imgWidth) / 2;
      const y = 0; // start at the top of the page

      doc.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
      doc.save("reports.pdf");
    });

    setFormValues({
      instituteName: "",
      courseTitle: "",
      courseCode: "",
      semester: "",
      section: "",
    })
  };

  console.log(report);
  return (
    <>
      <Container sx={{ mt: 3 }}>
        <Box textAlign={"left"} p={3} pb={0}>
          <Link
            to={`/Reports`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
          </Link>
        </Box>
        <Box
          sx={{
            marginBottom: "1em",
            textAlign: "right",
            p: 3,
            pt: 0,
            pb: 0,
          }}
        >
          <TextField
            placeholder="Search by name"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch("")}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box textAlign={"right"} pr={3}>
          <Button
            variant="text"
            sx={{ color: "#717270" }}
            onClick={() => setOpenModal(true)}
          >
            <LocalPrintshopIcon fontSize="large" />
            <Typography variant="h6" ml={1}>
              Download PDF
            </Typography>
          </Button>
        </Box>
        <Box className="downloadPDF" p={3}>
          {isFormComplete && (
            <Grid container columns={12} columnSpacing={2}>
              <Grid item xs={12}>
                {" "}
                <Typography variant="h4">{formValues.instituteName}</Typography>
              </Grid>
              <Grid item xs={6} textAlign={"right"}>
                <Typography display={"inline-block"}>
                  <b>Course Title :</b> {formValues.courseTitle}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign={"left"}>
                {" "}
                <Typography display={"inline-block"}>
                  <b>Course Code :</b> {formValues.courseCode}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign={"right"}>
                <Typography display={"inline-block"}>
                  <b>Section :</b> {formValues.section}
                </Typography>
              </Grid>
              <Grid item xs={6} textAlign={"left"}>
                <Typography display={"inline-block"}>
                  <b>Semester :</b> {formValues.semester}
                </Typography>
              </Grid>
            </Grid>
          )}
          <TableContainer sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontSize: "large",
                      fontWeight: "bolder",
                      color: "#1E75A3",
                    }}
                  >
                    Rank
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "large",
                      fontWeight: "bolder",
                      color: "#1E75A3",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "large",
                      fontWeight: "bolder",
                      color: "#1E75A3",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "large",
                      fontWeight: "bolder",
                      color: "#1E75A3",
                    }}
                  >
                    Marks Obtained
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report
                  ?.filter((data) => {
                    return search.toLowerCase() === ""
                      ? data
                      : data.name.toLowerCase().includes(search);
                  })
                  .map((item, index) => {
                    return (
                      <TableRow key={item.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.totalMarks}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {openModal && (
          <PrintModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            formValues={formValues}
            setFormValues={setFormValues}
            downloadPDF={downloadPDF}
          />
        )}
      </Container>
    </>
  );
};

export default ShowReport;
