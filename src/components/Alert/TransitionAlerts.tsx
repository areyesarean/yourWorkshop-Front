import Box from "@mui/material/Box";
import Alert, { AlertColor } from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface TransitionAlertsProps {
  open: boolean;
  severity: AlertColor;
  variant: "outlined" | "standard" | "filled";
  text: string;
  color:
    | "success"
    | "info"
    | "warning"
    | "error"
    | "inherit"
    | "default"
    | "primary"
    | "secondary";
}

const TransitionAlerts = ({
  text,
  open,
  color,
  severity,
  variant,
}: TransitionAlertsProps) => {
  const [showAlert, setShowAlert] = useState(open);
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={showAlert}>
        <Alert
          severity={severity}
          variant={variant}
          action={
            <IconButton
              aria-label="close"
              color={color}
              size="small"
              onClick={() => setShowAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{  mt: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default TransitionAlerts;
