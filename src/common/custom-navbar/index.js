import * as React from "react";
import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LeafIcon from "@mui/icons-material/Spa";
import { teal } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { checkLogInTrace, delay } from "../../helper";
import { ToastContainer, toast } from "react-toastify/dist/react-toastify.js";
import "react-toastify/dist/ReactToastify.css";
import { axiosApi } from "../../api/api-interceptor";
import { getLoggedInUser } from "../../api";

const pages = ["Home", "Listeners", "Connections", "Feedbacks"];
const settings = ["Profile", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProfilePic() {
      const profilePicUrl = await getLoggedInUser()
      setProfilePic(profilePicUrl)
    }

    getProfilePic()
  }, [navigate])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    navigateToPage(e.target.innerText);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosApi.post("/logout");
      if (response.status === 200) {
        toast.success("logged out successfully");
        await delay(500)
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error logging out:", error);
    }
  };

  const navigateToPage = (p) => {
    const page = p.replace(/(\r\n|\n|\r)/gm, "").trim()
    if (page === "HOME") {
      navigate("/home");
    } else if (page === "LISTENERS") {
      navigate("/experts");
    } else if (page === "CONNECTIONS") {
      navigate("/connections");
    } else if (page === "FEEDBACKS") {
      navigate("/feedbackslist");
    } else if (page === "Profile") {
      navigate("/profile");
    } else if (page === "Logout") {
      handleLogout();
    }
  };

  const handleCloseUserMenu = (e) => {
    setAnchorElUser(null);
    navigateToPage(e.target.innerText);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: teal[700] }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center"
            }}
          >
            <LeafIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            NEW LEAF
          </Typography>
          {checkLogInTrace() ? (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar1"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            NEW LEAF
          </Typography>
          {checkLogInTrace() ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page, index) => (
                  <Button
                    key={index}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open user settings">
                  <div className="avatar-element" onClick={handleOpenUserMenu}>
                    <Avatar
                      alt="Remy Sharp"
                      src={profilePic}
                    />
                  </div>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, index) => (
                    <MenuItem key={index} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
