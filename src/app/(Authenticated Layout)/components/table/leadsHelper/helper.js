import { TableCell, TableRow, Typography } from "@mui/material";
import React from "react";

export const formatKey = (key) => {
  return key
    .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
export const formatData = (data) => {
  return Object.entries(data)
    .map(([key, value]) => {
      return `${formatKey(key)}: ${
        Array.isArray(value)
          ? value.join(", ")
          : typeof value === "object"
          ? JSON.stringify(value)
          : value
      }`;
    })
    .join("\n"); // Use newline character to separate each line
};

export const renderTableRows = (data_to_show, prefix = "") => {
  return Object.entries(data_to_show).map(([key, value]) => {
    const formattedKey = prefix
      ? `${prefix} - ${formatKey(key)}`
      : formatKey(key);
    const typographyProps = { color: "textSecondary", fontWeight: "400" };

    if (Array.isArray(value)) {
      return (
        <React.Fragment key={key}>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography
                textAlign="center"
                fontWeight="700"
                {...typographyProps}
              >
                {formattedKey}
              </Typography>
            </TableCell>
          </TableRow>
          {value.map((item, index) =>
            typeof item === "object" ? (
              renderTableRows(item)
            ) : (
              <TableRow key={`${key}-${index}`}>
                <TableCell width="50%">
                  <Typography {...typographyProps}>
                    {formattedKey} [Item {index + 1}]
                  </Typography>
                </TableCell>
                <TableCell width="50%">
                  <Typography {...typographyProps}>{item}</Typography>
                </TableCell>
              </TableRow>
            )
          )}
        </React.Fragment>
      );
    }

    if (value && typeof value === "object") {
      return (
        <React.Fragment key={key}>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography
                textAlign="center"
                fontWeight="700"
                {...typographyProps}
              >
                {formattedKey}
              </Typography>
            </TableCell>
          </TableRow>
          {renderTableRows(value, formattedKey)}
        </React.Fragment>
      );
    }

    return (
      <TableRow key={key}>
        <TableCell width="50%">
          <Typography {...typographyProps}>{formattedKey}</Typography>
        </TableCell>
        <TableCell width="50%">
          <Typography {...typographyProps}>{value}</Typography>
        </TableCell>
      </TableRow>
    );
  });
};
