import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export const Navbar = () => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button component={RouterLink} to="/" color="inherit">
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            ArandaSoftCatalog
                        </Typography>
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
