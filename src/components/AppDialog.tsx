import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Box, IconButton } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface AppDialogProps {
  open: boolean;
  title?: string;
  children: JSX.Element;
  handleClose: () => void;
  dialogActions?: JSX.Element;
}

export default function AppDialog({
  open,
  title,
  children,
  handleClose,
  dialogActions,
}: AppDialogProps) {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={handleClose}>
      <Box sx={{ width: "500px", maxWidth: "80vw", bgcolor: "background.card" }}>
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "grey.500",
            }}
          >
            <CloseIcon />
          </IconButton>
          {title || ""}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>{children}</DialogContent>
        {dialogActions && <DialogActions>{dialogActions}</DialogActions>}
      </Box>
    </Dialog>
  );
}
