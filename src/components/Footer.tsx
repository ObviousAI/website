import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

import styles from "../styles/Footer.module.css";

const StyledButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`;

const Footer = () => {
  const redirectUrl = (url: string) => {
    window.location.href = url;
  };

  return (
    <Box
      sx={{
        marginTop: "auto",
      }}
    >
      <footer className={styles.footer}>
        <StyledButton
          className={styles.button}
          onClick={() => {
            redirectUrl(
              "https://docs.google.com/forms/d/e/1FAIpQLScUNfriYXZgmh06wWQSabA4TVtSbvQGs-Gs6cyMpNSRFyXkIQ/viewform?usp=sf_link"
            );
          }}
        >
          Give us feedback
        </StyledButton>
        <StyledButton
          className={styles.button}
          onClick={() => {
            redirectUrl("https://calendly.com/denizbirlikci/contact-us");
          }}
        >
          Contact us
        </StyledButton>
        <StyledButton
          className={styles.button}
          onClick={() => {
            redirectUrl(
              "https://docs.google.com/forms/d/e/1FAIpQLScUpgQgGHvoEH5ikIu2Mj46k-nPbc2CTDJmmDljCtEJorpCgw/viewform?usp=sf_link"
            );
          }}
        >
          Request a brand
        </StyledButton>
      </footer>
    </Box>
  );
};

export default Footer;
