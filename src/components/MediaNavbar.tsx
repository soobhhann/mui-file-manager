import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useMediaContext } from "../MuiFileManager";
import useNames from "../hooks/useNames";

const MediaNavbar = () => {
  const { t } = useNames();

  // ANCHOR context
  const { handleUpload, handleCreateFolder, refetch, permissions } =
    useMediaContext();

  const iconStyle = { fontSize: "1.5rem !important", color: "text.main" };

  const canUpload = permissions ? permissions?.file?.includes("upload") : true;
  const canCreate = permissions
    ? permissions?.folder?.includes("create")
    : true;

  return (
    <Grid container p={1} sx={{ borderBottom: "1px solid gray" }}>
      {/* practical buttons */}
      {canUpload && (
        <Button
          variant="text"
          onClick={handleUpload}
          sx={{ mx: 1 }}
          startIcon={<UploadFileIcon sx={iconStyle} />}
        >
          {t("upload")}
        </Button>
      )}
      {canCreate && (
        <Button
          variant="text"
          onClick={handleCreateFolder}
          startIcon={<CreateNewFolderIcon sx={iconStyle} />}
        >
          {t("new folder")}
        </Button>
      )}

      <div style={{ flex: 1 }}></div>

      {/* helper buttons */}
      <Tooltip title={t("refresh")}>
        <IconButton onClick={refetch}>
          <RefreshIcon sx={iconStyle} />
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default MediaNavbar;
