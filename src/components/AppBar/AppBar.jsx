import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ModeSelect from '../ModeSelect/ModeSelect';
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg';
import SvgIcon from '@mui/material/SvgIcon';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import Profiles from './Menus/Profiles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

import AppsIcon from '@mui/icons-material/Apps';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';


function AppBar() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflowX: 'auto',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? '#2c3e50' : '#1565c0',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon
            component={TrelloIcon}
            inheritViewBox
            fontSize='small'
            sx={{ color: 'white' }}
          />
          <Typography
            variant='span'
            sx={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Trello
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button
            sx={{
              color: 'white',
              border: 'none',
              '&:hover': { border: 'none' },
            }}
            variant='outlined'
            startIcon={<LibraryAddCheckIcon />}
          >
            Create
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField
          id='outlined-search'
          label='Search...'
          type='text'
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon sx={{ color: 'white' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <CloseIcon
                fontSize='small'
                sx={{
                  color: searchValue ? 'white' : 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => setSearchValue('')}
              />
            ),
          }}
          sx={{
            minWidth: '120px',
            maxWidth: '150px',
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' }, // Chữ "Search" màu trắng
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white', // Viền vẫn hiển thị màu trắng
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Đang focus và blur thì viền vẫn màu trắng
              },
            },
          }}
        />
        <ModeSelect />

        <Tooltip title='Notification'>
          <Badge
            color='warning'
            variant='dot'
            sx={{ cursor: 'pointer' }}
          >
            <NotificationsNoneIcon sx={{ color: 'white' }} />
          </Badge>
        </Tooltip>

        <Tooltip title='Help'>
          <HelpOutlineIcon
            sx={{ color: 'white', cursor: 'pointer' }}
          />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBar;
