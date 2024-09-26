/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, styled } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

const ContextBox = styled(Box)(({ theme }: any) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.main,
  zIndex: 9999,
  // position: "absolute",
  border: `1px solid ${theme.palette.grey[800]}`,
  borderRadius: theme.shape.borderRadius,
}));

const AppContextMenu: FC<{ menuItems: JSX.Element; children: any }> = ({
  children,
  menuItems,
}) => {
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleClick = () => {
      // @ts-ignore
      window.context = false;
      setClicked(false);
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleContext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    // @ts-ignore
    if (!window.context) {
      // @ts-ignore
      window.context = true;
      setClicked(true);
      setPoints({
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const handleTouches = (e: React.TouchEvent<HTMLDivElement>) => {
    setPoints({ x: e.touches[0].pageX, y: e.touches[0].pageY });
  };

  const handleXPosition = (x: number) => {
    if (x > window.innerWidth / 1.5) {
      return x - 100;
    } else {
      return x;
    }
  };

  return (
    <div onContextMenu={handleContext} onTouchStart={handleTouches}>
      {children}

      {clicked && (
        <div
          style={{
            position: "absolute",
            left: handleXPosition(points.x),
            top: points.y / 1.5,
            zIndex: 9999,
            transition: "all 0.3s",
            scale: 1,
          }}
        >
          <ContextBox>{menuItems}</ContextBox>
        </div>
      )}
    </div>
  );
};

export default AppContextMenu;
