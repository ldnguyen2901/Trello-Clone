import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import Tooltip from '@mui/material/Tooltip';

import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const MENU_STYLE = {
  color: 'primary.main',
  bgcolor: 'white',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main',
  },
  '&:hover': {
    bgcolor: 'primary.50',
  },
};
function BoardBar() {
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        borderTop: '1px solid #00bfa5',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLE}
          icon={<DashboardIcon />}
          label='Karama'
          clickable
          // onclick={() => {}}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label='Public/Private Workspaces'
          clickable
          // onclick={() => {}}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label='Add to Google Drive'
          clickable
          // onclick={() => {}}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label='Automation'
          clickable
          // onclick={() => {}}
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label='Filters'
          clickable
          // onclick={() => {}}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button variant='outlined' startIcon={<PersonAddIcon />}>
          Invite
        </Button>

        <AvatarGroup
          max={6}
          sx={{
            '& .MuiAvtar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
            },
          }}
        >
          <Tooltip>
            <Avatar
              alt='AvatarYourself'
              src='https://avatars.githubusercontent.com/u/56474353?v=4'
            />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Travis Howard' src='https://picsum.photos/200/100' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Cindy Baker' src='https://picsum.photos/200/300' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Agnes Walker' src='https://picsum.photos/200/400' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Trevor Henderson' src='https://picsum.photos/200/500' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Trevor Henderson' src='https://picsum.photos/200/600' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Trevor Henderson' src='https://picsum.photos/200/700' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Trevor Henderson' src='https://picsum.photos/200/800' />
          </Tooltip>
          <Tooltip>
            <Avatar alt='Trevor Henderson' src='https://picsum.photos/200/900' />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
}

export default BoardBar;
