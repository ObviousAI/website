import styles from "../styles/Footer.module.css";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)`
  &:hover {
    background-color: transparent;
  }
`;

const Footer = () => {
  return (
    <Box>
      <footer className={styles.footer}>
        <StyledButton
          className={styles.button}
          onClick={() => alert("Feedback clicked!")}
        >
          Give us Feedback
        </StyledButton>
        <StyledButton
          className={styles.button}
          onClick={() => alert("Feedback clicked!")}
        >
          Request a new brand
        </StyledButton>
        <StyledButton
          className={styles.button}
          onClick={() => alert("Feedback clicked!")}
        >
          Contact us
        </StyledButton>
        <StyledButton
          className={styles.button}
          onClick={() => alert("Request a demo clicked!")}
        >
          Accessibility
        </StyledButton>
      </footer>
    </Box>
  );
};

export default Footer;
