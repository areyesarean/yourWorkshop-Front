import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      {...props}
      mt={3}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Tu taller
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
