import { ListItemButton, Typography } from "@mui/material";
import React from "react";
import useMediaActions from "../hooks/useMediaActions";

const MediaContextMenu = ({ type, data }: { type: "folder" | "file"; data?: any }) => {

  // ANCHOR hooks
  const { contextMenuItems } = useMediaActions(type);

  return (
    <>
      {contextMenuItems.map((item, index) => (
        <ListItemButton
          key={index}
          sx={{ p: 2 }}
          onClick={() => {
            item.callback({ type, data });
          }}
        >
          {item.Icon}
          <Typography variant="body2" sx={{ mx: 1 }}>
            {item.label}
          </Typography>
        </ListItemButton>
      ))}
    </>
  );
};

export default MediaContextMenu;
