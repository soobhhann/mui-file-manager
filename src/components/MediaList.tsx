/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, styled, Typography } from "@mui/material";
import React, { FC, Fragment, memo, useCallback } from "react";

import { MediaListInterface } from "../interfaces/MediaTypes";

import FolderIcon from "@mui/icons-material/Folder";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import FolderZipIcon from "@mui/icons-material/FolderZip";
import ArticleIcon from "@mui/icons-material/Article";
import MediaContextMenu from "./MediaContextMenu";
import AppContextMenu from "../components/AppContextMenu";
import { useMediaContext } from "../providers/MediaProvider";
import useNames from "../hooks/useNames";

// ANCHOR styles
const boxSize = "6.5rem";
const MediaBox = styled(Box)(({ theme }: any) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  color: theme.palette.text.main,
  margin: `0 ${theme.spacing(2)}`,
  borderRadius: theme.shape.borderRadius * 2,
  cursor: "pointer",
  width: boxSize,
  height: boxSize,
  wordBreak: "break-word",
  padding: theme.spacing(1),
  textAlign: "center",
  ":hover": {
    backgroundColor: theme.palette.action.selected,
  },
}));

const iconsStyle = { fontSize: "3rem !important", mb: 1 };

const selectedStyle = {
  backgroundColor: "action.selected",
  ":hover": {
    backgroundColor: "action.selected",
  },
};

// ANCHOR component
const MediaList: FC = () => {
  const {t} = useNames()

  // ANCHOR context
  const { currentPath, handleClickBack, data, handleFolderClick, handleFileClick, selected } =
    useMediaContext();

  // ANCHOR makers
  const iconPicker = useCallback((file: MediaListInterface["files"][0]) => {
    const type = file.mime_type.split("/")[0];

    switch (type) {
      case "image":
        return (
          <img
            src={file.file}
            style={{ marginBottom: "10px", height: "3.5rem", maxWidth: "95%" }}
          />
        );
      case "video":
        return <VideoFileIcon sx={iconsStyle} />;
      case "zip":
        return <FolderZipIcon sx={iconsStyle} />;
      default:
        return <ArticleIcon sx={iconsStyle} />;
    }
  }, []);

  const makeSmallText = useCallback(
    (text: string) => (text?.length > 30 ? text.slice(0, 15) + "..." : text),
    []
  );

  return (
    <>
      <Grid py={4} flexWrap="wrap" container>
        {/* back button */}
        {currentPath !== "/" && (
          <MediaBox onClick={handleClickBack}>
            <DriveFolderUploadIcon sx={iconsStyle} />
            <Typography variant="body2">{t("back")}</Typography>
          </MediaBox>
        )}

        {/* show folders */}
        {data?.folders.map((folder, index) => (
          <Fragment key={index}>
            <AppContextMenu menuItems={<MediaContextMenu type="folder" data={folder} />}>
              <MediaBox
                sx={folder.full_path === selected ? selectedStyle : undefined}
                onClick={() => handleFolderClick(folder.full_path)}
              >
                <FolderIcon sx={iconsStyle} />
                <Typography variant="body2">{makeSmallText(folder.name)}</Typography>
              </MediaBox>
            </AppContextMenu>
          </Fragment>
        ))}

        {/* show files */}
        {data?.files.map((file, index) => (
          <Fragment key={index}>
            <AppContextMenu menuItems={<MediaContextMenu type="file" data={file} />}>
              <MediaBox
                key={index}
                sx={String(file.id) === selected ? selectedStyle : undefined}
                onClick={() => handleFileClick(file)}
              >
                {iconPicker(file)}
                <Typography variant="body2">{makeSmallText(file.name_without_prefix)}</Typography>
              </MediaBox>
            </AppContextMenu>
          </Fragment>
        ))}
      </Grid>
    </>
  );
};

export default memo(MediaList);
