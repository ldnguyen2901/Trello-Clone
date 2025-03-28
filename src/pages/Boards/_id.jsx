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
  updateBoardDetailsAPI,
} from '~/apis';

import { generatePlaceholderCard } from '~/utils/formatters';
import { isEmpty } from 'lodash';

function Board() {
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // Tạm thời fix cứng boardId, có thể sử dụng react-router-dom để lấy chuẩn boardId từ URL về
    const boardId = '67e3f82def3100afbfbd0aaf';

    // Call API
    fetchBoardDetailsAPI(boardId).then((board) => {
      // Khi F5 lại trang Web thì cần xử lý vấn đề kéo thả vào một column rỗng
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      console.log(board);
      setBoard(board);
    });
  }, []);

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });
    // Khi tạo column mới thì chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // Cập nhật state board
    // Phía FE ta phài tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tuỳ lựa chọn và đặc thù của dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);
    setBoard(newBoard);
  };

  // Func này có nhiệm vụ gọi API tạo mới Column và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      boardId: board._id,
      ...newCardData,
    });
    // console.log('createdCard: ', createdCard);

    // Cập nhật state board
    // Phía FE ta phài tự làm đúng lại state data board (thay vì phải gọi lại api fetchBoardDetailsAPI)
    // Lưu ý: cách làm này phụ thuộc vào tuỳ lựa chọn và đặc thù của dự án, có nơi thì BE sẽ hỗ trợ trả về luôn toàn bộ Board dù đây có là api tạo Column hay Card
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => column._id === createdCard.columnId,
    );
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };

  // Func này có nhiệm vụ gọi API và xử lý khi kéo thả Column xong
  const moveColumns = async (dndOrderedColumns) => {
    // Update lại cho chuẩn dữ liệu state board
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // Gọi API update Board
    await updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnsIds,
    });
  };

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
      />
    </Container>
  );
}

export default Board;
