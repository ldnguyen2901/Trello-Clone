// Boards Details
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from './BoardBar/BoardBar';
import BoardContent from './BoardContent/BoardContent';

// import { mockData } from '~/apis/mock-data';
import {
  fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
} from '~/apis';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // Tạm thời fix cứng boardId, có thể sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '67e3f82def3100afbfbd0aaf';

    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board);
    });
  }, []);

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      boardId: board._id,
      ...newColumnData,
    });
    console.log('createdColumn: ', createdColumn);
  };

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      boardId: board._id,
      ...newCardData,
    });
    console.log('createdCard: ', createdCard);
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  );
}

export default Board;
