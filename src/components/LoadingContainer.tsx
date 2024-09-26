import styled from "@emotion/styled";
import { CircularProgress } from "@mui/material";
import React, { FC } from "react";

const Container = styled.div`
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const LoadingContainer: FC<{ isLoading?: boolean; children: JSX.Element }> = ({
  isLoading,
  children,
}) => {
  if (!isLoading) return <>{children}</>;
  return (
    <div style={{ position: "relative" }}>
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 101,
        }}
      />
      <Container />
      {children}
    </div>
  );
};

export default LoadingContainer;
