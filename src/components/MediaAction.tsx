import { Button, Grid } from "@mui/material";
import React, { FC, memo } from "react";
import { useMediaContext } from "../MuiFileManager";
import useNames from "../hooks/useNames";

const MediaAction: FC = () => {
  const { t } = useNames();
  // ANCHOR context
  const { handlePaste, handleCancel, selectToAction } = useMediaContext();

  return (
    <>
      {Boolean(selectToAction.from) && (
        <Grid container mt={2} p={2} sx={{ bgcolor: "grey.800" }}>
          <Button onClick={handlePaste} sx={{ mr: 2 }}>
            {t("past here")}
          </Button>
          <Button onClick={handleCancel} variant="outlined">
            {t("cancel")}
          </Button>
        </Grid>
      )}
    </>
  );
};

export default memo(MediaAction);
