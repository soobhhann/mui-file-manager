import { Box } from "@mui/material";
import LoadingContainer from "./LoadingContainer";
import React, { FC } from "react";
import { useMediaContext } from "../MuiFileManager";
import MediaAction from "./MediaAction";
import MediaBreadCrumb from "./MediaBreadCrumb";
import MediaDialog from "./MediaDialog";
import MediaList from "./MediaList";
import MediaNavbar from "./MediaNavbar";

const AppMedia: FC = () => {
  const { isLoading } = useMediaContext();
  return (
    <>
      <LoadingContainer isLoading={isLoading}>
        <Box
          bgcolor="background.card"
          borderRadius={2}
          sx={{ border: "0.5px solid", borderColor: "gray.600" }}
        >
          {/* navbar */}
          <MediaNavbar />
          {/* bread crumb */}
          <MediaBreadCrumb />
          {/* actions */}
          <MediaAction />
          {/* media list */}
          <MediaList />
        </Box>
      </LoadingContainer>
      <MediaDialog />
    </>
  );
};

export default AppMedia;
