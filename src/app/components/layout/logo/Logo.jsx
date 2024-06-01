"use client";
import { useSelector } from "react-redux";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? "40px" : "180px",
    overflow: "hidden",
    display: "block",
  }));

  return (
    <LinkStyled href="/">
      {customizer.activeMode === "dark" ? (
        <Image
          src="/images/logos/flow-logo-dark.svg"
          alt="logo"
          height={customizer.TopbarHeight}
          width={customizer.isCollapse ? "40" : "180"}
          priority
        />
      ) : (
        <Image
          src={"/images/logos/flow-logo-light.svg"}
          alt="logo"
          height={customizer.TopbarHeight}
          width={customizer.isCollapse ? "40" : "180"}
          priority
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
