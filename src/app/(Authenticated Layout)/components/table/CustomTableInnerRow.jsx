"use client";
import {
  Box,
  Button,
  Collapse,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import ClipboardJS from "clipboard";
import { useEffect, useRef } from "react";
const formatKey = (key) => {
  return key
    .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
export default function CustomTableInnerRow({ details, open, id }) {
  if (details.length <= 0) {
    return;
  }
  const tableRef = useRef(null);
  const copyButtonRef = useRef(null);
  console.log(tableRef.current);
  useEffect(() => {
    console.log(tableRef);
    // const clipboard = new ClipboardJS(copyButtonRef.current, {
    //   // target: () => tableRef.current,
    // });

    // clipboard.on("success", () => {
    //   alert("Inner row data copied to clipboard!");
    // });

    // clipboard.on("error", (e) => {
    //   console.error("Error copying to clipboard: ", e);
    // });

    // return () => {
    //   clipboard.destroy();
    // };
  }, []);
  return (
    <>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.bg.dark
                        : theme.palette.bg.light
                    }`,
                  p: "5px 15px",
                  color: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.text.light
                        : "rgba(0, 0, 0, 0.87)"
                    }`,
                }}
                textAlign={"center"}
              >
                <Stack>
                  <Typography
                    variant="h3"
                    marginTop={"10px"}
                    marginBottom={"10px"}
                  >
                    Lead No. {id}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} justifyContent={"center"}>
                  <Typography variant="h4" fontWeight="600">
                    Client Details
                  </Typography>
                  <Button
                    sx={{
                      padding: "13px 48px",
                      fontSize: "16px",
                    }}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    variant="contained"
                    color="success"
                    ref={copyButtonRef}
                    data-clipboard-target={`#table-${details.id}`}
                  >
                    Copy Details
                  </Button>
                </Stack>
              </Typography>
              <Table
                size="small"
                aria-label="details"
                id={`table-${details.id}`}
                ref={tableRef}
              >
                <TableBody>
                  {Object.entries(details).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell width={"50%"}>
                        <Typography color="textSecondary" fontWeight="400">
                          {formatKey(key)}
                        </Typography>
                      </TableCell>
                      <TableCell width={"50%"}>
                        <Typography color="textSecondary" fontWeight="400">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
