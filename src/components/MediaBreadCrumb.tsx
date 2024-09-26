import { Stack, Typography, useTheme } from '@mui/material';
import React, { memo } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useMediaContext } from '../providers/MediaProvider';

const MediaBreadCrumb = () => {
  const { direction } = useTheme();
  // ANCHOR - context
  const { currentPath, handleChangePath } = useMediaContext();

  const typoStyle = {
    color: 'text.main',
    cursor: 'pointer',
    mx: 0.5,
    fontSize: '1rem',
  };

  return (
    <Stack
      direction="row"
      divider={
        direction ? (
          <ArrowLeftIcon sx={typoStyle} />
        ) : (
          <ArrowRightIcon sx={typoStyle} />
        )
      }
      p={2}
      sx={{ bgcolor: 'background.default', borderBottom: '1px solid gray' }}
      alignItems="center"
    >
      <Typography sx={typoStyle} onClick={() => handleChangePath(false)}>
        /
      </Typography>
      {currentPath
        .split('/')
        .filter(Boolean)
        .map((path, index) => (
          <Typography
            sx={typoStyle}
            key={index}
            onClick={() => handleChangePath(index)}
          >
            {path}
          </Typography>
        ))}
    </Stack>
  );
};

export default memo(MediaBreadCrumb);
