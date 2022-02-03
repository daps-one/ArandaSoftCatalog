import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{backgroundColor: 'white'}}>
                <Toolbar>
                    <Button component={RouterLink} to="/" color="inherit">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <img src="/logo-aranda-header.png"></img>
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
