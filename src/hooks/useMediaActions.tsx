import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import Delete from "@mui/icons-material/Delete";
import { useMediaContext } from "../providers/MediaProvider";
import { mediaPermissionsTypes } from "../interfaces/MediaTypes";
import React from "react";

const useMediaActions = (type?: "folder" | "file") => {
  const { setSelectToAction, setDialogActions, permissions } = useMediaContext();

  type actionsType = {
    type: "folder" | "file";
    action: string;
    data?: any;
  };

  const handleActions = (data: actionsType) => {
    setSelectToAction({
      action: data.action,
      from: data.type === "folder" ? data.data.full_path || "" : String(data.data.id),
      to: "",
      type: data.type,
    });
  };

  const handleDialogFunc = (data: actionsType) => {
    setDialogActions({ open: true, type: data.type, action: data.action, data: data.data });
  };

  const maker = (label: mediaPermissionsTypes, Icon: any) => {
    if (type && permissions && !permissions?.[type]?.includes(label)) return null;
    return {
      label,
      Icon: <Icon sx={{ fontSize: "1.4rem !important" }} />,
      callback: (data: Omit<actionsType, "action">) =>
        ["rename", "remove"].includes(label)
          ? handleDialogFunc({ ...data, action: label })
          : handleActions({ ...data, action: label }),
    };
  };

  const contextMenuItems = [
    maker("cut", ContentCutIcon),
    maker("copy", ContentCopyIcon),
    maker("rename", DriveFileRenameOutlineIcon),
    maker("remove", Delete),
  ].filter(Boolean) as {
    label: string;
    Icon: JSX.Element;
    callback: (data: Omit<actionsType, "action">) => void;
  }[];

  return { contextMenuItems };
};

export default useMediaActions;
