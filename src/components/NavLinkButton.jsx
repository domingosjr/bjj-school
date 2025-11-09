import { Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function NavLinkButton({ to, children }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Button
      component={Link}
      to={to}
      variant={active ? "contained" : "text"}
      color="primary"
      sx={{ textTransform: "none" }}
    >
      {children}
    </Button>
  );
}
