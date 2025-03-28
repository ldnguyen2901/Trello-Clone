import { useState } from 'react';
import { toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Button from '@mui/material/Button';

import Cloud from '@mui/icons-material/Cloud';
import ContentCut from '@mui/icons-material/ContentCut';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

import ListCards from './ListCards/ListCards';
// import { mapOrder } from '~/utils/sorts';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Opacity } from '@mui/icons-material';

function Column({ column, createNewCard }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyles = {
    // touchAction: 'none', // Dành cho sensor default dạng PointerSensor
    // Nếu sử dụng CSS.Ttransform như docs sẽ lỗi kiểu stretch
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform),
    transition,
    // Chiều cao phải muôn max 100% vì nếu không sẽ lỗi lúc kéo column ngắn qua một cái column dài thì phải kéo ở khu vực giữa, rất khó chịu. Lưu ý lúc này phải kết hợp với {...listerners} nằm ở Box chứ không phải ở dic ngoài cùng để tránh trường hợp kéo vào vùng xanh
    height: '100%',
    opacity: isDragging ? 0.5 : undefined,
  };

  // Cards đã được sắp xếp ở component cha cao nhất (boards/_id.jsx)
  const orderedCard = column.cards;

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const [newCardTitle, setNewCardTitle] = useState('');

  const addNewCard = () => {
    if (!newCardTitle) {
      toast.error('Please enter Card Title!', { position: 'bottom-right' });
      return;
    }
    // console.log(newCardTitle);
    // Gọi API
    const newCardData = { title: newCardTitle, columnId: column._id };
    /**
     * Gọi lên props function createNewColumn nằm ở component cha cao nhất (boards/_id.jsx)
     * Lúc này ta có thể gọi luôn API ở đây là xong thay vì phải lần lượt gọi ngược lên nhựng compoent cha phía bên trên.
     * (Đối với component con nằm càng sau thì càng khổ)
     * Với việc sử dụng Redux như vậy thì code sẽ Clean chuẩn chỉnh hơn rất nhiều
     */
    createNewCard(newCardData);
    // Đóng trạng thái thêm Card mới & Clear Input
    setOpenNewCardForm();
    setNewCardTitle('');
  };

  // Phải bọc div ở đây vì vấn đề chiều cao của column khi kéo thả sẽ có bug kiểu flickering
  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#333643' : '#ebecf0',
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) =>
            `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant='h6'
            sx={{ fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More options'>
              <ExpandMoreIcon
                sx={{ color: 'text.primary', cursor: 'pointer' }}
                id='basic-column-dropdown'
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id='basic-menu-column-dropdown'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown',
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCardIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize='small' />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize='small' />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForeverIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize='small' />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* List Cards */}
        <ListCards cards={orderedCard} />

        {/* Box Column Footer */}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Button
                startIcon={<AddCardIcon />}
                onClick={toggleOpenNewCardForm}
              >
                Add new card
              </Button>
              <Tooltip title='Drag to move'>
                <DragHandleIcon sx={{ cursor: 'pointer' }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <TextField
                label='Enter card title...'
                type='text'
                size='small'
                variant='outlined'
                autoFocus
                data-no-dnd='true'
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                sx={{
                  '& label': { color: 'text.primary' },
                  '& input': {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? '#333643' : 'white',
                  },
                  '& label.Mui-focused': {
                    color: (theme) => theme.palette.primary.main,
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  '& .MuiOutlinedInput-input': { borderRaidus: 1 },
                }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button
                  onClick={addNewCard}
                  variant='contrained'
                  color='success'
                  size='small'
                  data-no-dnd='true'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': {
                      bgcolor: (theme) => theme.palette.success.main,
                    },
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: 'pointer',
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Column;
