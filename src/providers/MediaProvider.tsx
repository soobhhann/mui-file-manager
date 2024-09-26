import { Typography } from '@mui/material';
import AppDialog from '../components/AppDialog';
import {
  MediaContextType,
  MediaListInterface,
  MediaProviderProps,
} from '../interfaces/MediaTypes';
import React, { FC, useCallback, useState } from 'react';
import AppMedia, { AppMediaProps } from '../components/AppMedia';

// ANCHOR context
export const MediaContext = React.createContext<MediaContextType>(
  {} as MediaContextType
);

const MediaProvider: FC<AppMediaProps & {
  currentPath: string;
} & MediaProviderProps> = ({
  data,
  isLoading,
  currentPath,
  permissions,
  keywords,
  refetch,
  onFileAction,
  onFolderAction,
  setCurrentPath,
  onSelectFile,
}) => {
  // ANCHOR states
  const [IsModal, setIsModal] = useState<any>(false);
  const [selected, setSelect] = useState({} as MediaListInterface | string);
  const [selectToAction, setSelectToAction] = useState({
    action: '',
    from: '',
    to: '',
    type: '',
  });
  const [dialogActions, setDialogActions] = useState({
    open: false,
    type: '',
    action: '',
    data: {} as any,
  });

  // ANCHOR - handlers
  const handleCloseDialog = useCallback(() => {
    setDialogActions({
      open: false,
      type: '',
      action: '',
      data: {},
    });
  }, []);

  const handleRenameAndCreate = (Name: string) => {
    handleCloseDialog();
    const request =
      dialogActions.type === 'file' ? onFileAction : onFolderAction;

    const isRename = dialogActions.action === 'rename';
    const isFile = dialogActions.type === 'file';

    const data = isFile
      ? { media_id: dialogActions.data.id, name: Name }
      : {
          path: isRename ? dialogActions.data.full_path : currentPath,
          name: Name,
        };

    request({
      action: dialogActions.action,
      data,
      method: !isRename ? 'POST' : 'PATCH',
    }).then(() => {
      refetch();
    });
  };

  const handleUploadFile = (fileUpload: string | Blob) => {
    const data = new FormData();
    data.append('file', fileUpload);
    data.append('path', currentPath);

    onFileAction({ action: 'upload', data }).then(() => {
      refetch();
      handleCloseDialog();
    });
  };

  const handleDelete = () => {
    const request =
      dialogActions.type === 'file' ? onFileAction : onFolderAction;

    const isFile = dialogActions.type === 'file';

    const data = isFile
      ? { media_id: dialogActions.data.id, path: currentPath }
      : { path: dialogActions.data.full_path };

    request({
      action: 'remove',
      data,
      method: 'DELETE',
    }).then(() => {
      refetch();
      handleCloseDialog();
    });
  };

  const handleCreateFolder = () => {
    setDialogActions({
      open: true,
      type: 'folder',
      action: 'create',
      data: null,
    });
  };

  const handleUpload = () => {
    setDialogActions({
      open: true,
      type: 'file',
      action: 'upload',
      data: null,
    });
  };

  const handleChangePath = (index: number | false) => {
    if (index === false) return setCurrentPath('/');
    const newPath = currentPath
      .split('/')
      .filter(Boolean)
      .slice(0, index + 1)
      .join('/');
    setCurrentPath(newPath ? '/' + newPath : '/');
  };

  const handleCancel = useCallback(() => {
    setSelectToAction({ from: '', to: '', type: 'folder', action: '' });
  }, []);

  const handlePaste = () => {
    const request =
      selectToAction.type === 'file' ? onFileAction : onFolderAction;
    const data =
      selectToAction.type === 'file'
        ? { media_id: selectToAction.from, to: currentPath }
        : { from: selectToAction.from, to: currentPath };

    request?.({ action: selectToAction.action, data }).then(() => {
      handleCancel();
      refetch();
    });
  };

  const handleClickBack = useCallback(() => {
    const newPath = currentPath
      .split('/')
      .filter(Boolean)
      .slice(0, -1)
      .join('/');
    setCurrentPath(newPath ? '/' + newPath : '/');
  }, [currentPath]);

  const handleSelect = useCallback((path: string) => setSelect(path), []);

  const handleFolderClick = useCallback(
    (path: string) => {
      if (selected !== path) return handleSelect(path);
      setCurrentPath(path);
    },
    [selected]
  );

  const handleFileClick = useCallback(
    (file: MediaListInterface['files'][0]) => {
      const id = String(file.id);
      if (selected !== id) return handleSelect(id);

      if (onSelectFile) return onSelectFile(file);

      const mimType = file.mime_type.split('/')[0];
      if (mimType === 'image') return setIsModal(file);
    },
    [selected]
  );

  return (
    <MediaContext.Provider
      value={{
        data,
        isLoading,
        currentPath,
        dialogActions,
        selectToAction,
        selected,
        permissions,
        keywords,
        setIsModal,
        handleRenameAndCreate,
        handleUploadFile,
        handleDelete,
        handleCreateFolder,
        handleUpload,
        handleChangePath,
        handleCancel,
        handlePaste,
        handleClickBack,
        handleSelect,
        handleFolderClick,
        handleFileClick,
        handleCloseDialog,
        setSelectToAction,
        setDialogActions,
        refetch,
      }}
    >
      <AppMedia />
      <AppDialog open={Boolean(IsModal)} handleClose={() => setIsModal(false)}>
        <>
          <img src={IsModal?.file} width="100%" height="100%" />
          <Typography mt={2} variant="caption">
            {IsModal?.name_without_prefix}
          </Typography>
        </>
      </AppDialog>
    </MediaContext.Provider>
  );
};

export default MediaProvider;

export const useMediaContext = () => React.useContext(MediaContext);
