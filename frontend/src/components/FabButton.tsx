import { useTheme } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';

interface FloatingActionButtonZoomProps {
    onClick: () => void;
}

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const FloatingActionButtonZoom = ({ onClick }: FloatingActionButtonZoomProps) => {
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const fab = {
        color: 'primary' as 'primary',
        sx: fabStyle as SxProps,
        icon: <AddIcon />,
        label: 'Add',
    };

    return (
        <Zoom
            key={fab.color}
            in={true}
            timeout={transitionDuration}
            style={{
                transitionDelay: `${transitionDuration.exit}ms`,
            }}
            unmountOnExit
            onClick={onClick}
        >
            <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
                {fab.icon}
            </Fab>
        </Zoom>
    );
};

export default FloatingActionButtonZoom;