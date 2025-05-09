import React from "react";
import { Button } from "@mui/material";

const CustomButton: React.FC<any> = ({
  title,
  onClick,
  style,
  textStyle,
  ...props
}) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        backgroundColor: (theme) => theme.palette.primary,
        // paddingY: 2,
        borderRadius: 10,
        width: "100%",
        alignSelf: "center",
        fontFamily: "Fredoka, sans-serif",
        fontSize: "18px",
        textTransform: "none",
        ...style,
        "&:hover": {
          backgroundColor: (theme) => theme.palette.primary.light,
        },
      }}
      {...props}
    >
      <span style={textStyle}>{title}</span>
    </Button>
  );
};

export default CustomButton;
