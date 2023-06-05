/* eslint-disable @typescript-eslint/no-explicit-any */
import LoadingButton from '@mui/lab/LoadingButton';
import AppDialog from '../components/AppDialog';
import AppTextField from '../components/AppTextField';
import React, { FC, memo, useEffect, useState } from 'react';

import { DropzoneArea } from 'mui-file-dropzone';
import { Box, Grid, Typography } from '@mui/material';
import { useMediaContext } from '../providers/MediaProvider';
import useNames from '../hooks/useNames';

const MediaDialog: FC = () => {
  const { t } = useNames();
  // ANCHOR - context
  const {
    handleCloseDialog,
    handleRenameAndCreate,
    handleUploadFile,
    handleDelete,
    dialogActions,
    isLoading,
  } = useMediaContext();

  // ANCHOR - states
  const [Name, setName] = useState('');
  const [fileUpload, setFile] = useState<any>(null);

  // ANCHOR - useEffect
  useEffect(() => {
    if (dialogActions.open) setName(dialogActions.data?.name || '');
  }, [dialogActions.open]);

  return (
    <AppDialog open={dialogActions.open} handleClose={handleCloseDialog}>
      <>
        {['rename', 'create'].includes(dialogActions.action) && (
          <>
            <AppTextField
              value={Name}
              onChange={e => setName(e.target.value)}
              onKeyUp={(e: any) =>
                e.key === 'Enter' && handleRenameAndCreate(Name)
              }
              label={t("folder name")}
            />

            <LoadingButton
              loading={isLoading}
              onClick={() => handleRenameAndCreate(Name)}
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              {t('submit')}
            </LoadingButton>
          </>
        )}

        {dialogActions.action === 'upload' && (
          <>
            <DropzoneArea
              showAlerts={false}
              dropzoneClass="dropZoneBg"
              dropzoneText={t("upload your file")}
              clearOnUnmount
              showPreviews={false}
              showPreviewsInDropzone={false}
              filesLimit={1}
              fileObjects={[]}
              onChange={file => setFile(file[0])}
            />

            {fileUpload && (
              <Box mt={2}>
                <Typography variant="subtitle1">{t('file name')} :</Typography>
                <Typography variant="body2">{fileUpload?.path}</Typography>

                <LoadingButton
                  variant="contained"
                  sx={{ mt: 2 }}
                  fullWidth
                  loading={isLoading}
                  onClick={() => handleUploadFile(fileUpload)}
                >
                  {t('submit')}
                </LoadingButton>
              </Box>
            )}
          </>
        )}

        {dialogActions.action === 'remove' && (
          <>
            <Typography variant="body1" mb={2}>
              {t('Are you sure to delete')} ?
            </Typography>
            <Grid container justifyContent="space-around">
              <LoadingButton
                onClick={handleDelete}
                loading={isLoading}
                variant="contained"
                color="error"
              >
                {t('remove')}
              </LoadingButton>
              <LoadingButton
                variant="outlined"
                loading={isLoading}
                onClick={handleCloseDialog}
              >
                {t('cancel')}
              </LoadingButton>
            </Grid>
          </>
        )}
      </>
    </AppDialog>
  );
};

export default memo(MediaDialog);
