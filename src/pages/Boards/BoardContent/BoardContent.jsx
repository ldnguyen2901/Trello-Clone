import Box from '@mui/material/Box';
import ListColumns from './ListColumns/ListColumns';
import { mapOrder } from '~/utils/sorts';

import {
  DndContext,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

function BoardContent({ board }) {
  // https://docs.dndkit.com/api-documentation/sensors
  // const pointerSensor = useSensor(PointerSensor, {
  //   activationConstraint: { distance: 10 },
  // });
  // Yêu cầu chuột di chuyển 10px thì mới kích hoạt event, fix trường hợp click bị gọi event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  // Nhấn giữ 250ms và dung sai cảu cảm ứng (dễ hiểu là di chuyển/chênh lệch 500px) thì mới kích hoạt event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });

  // Ưu tiên sử dụng kết hợp 2 loại sensors là mouse và touch để có trải nghiệm trên mobile tốt nhất, không bị bug
  // const mySensors = useSensors(pointerSensor);
  const mySensors = useSensors(mouseSensor, touchSensor);

  const [orderedColumnsState, setOrderColumnsState] = useState([]);

  useEffect(() => {
    const orderedColumns = mapOrder(
      board?.columns,
      board?.columnOrderIds,
      '_id',
    );
    setOrderColumnsState(orderedColumns);
  }, [board]);

  const handleDragEnd = (event) => {
    console.log('handleDragEnd: ', event);
    const { active, over } = event;

    // Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return;

    // Nếu vị trí sau khi kéo thả khác với vị trí ban đầu
    if (active.id !== over.id) {
      // Lấy vị trí cũ (từ thằng active)
      const oldIndex = orderedColumnsState.findIndex(
        (c) => c._id === active.id,
      );
      // Lấy vị trí mới (từ thằng over)
      const newIndex = orderedColumnsState.findIndex((c) => c._id === over.id);

      // Dùng arrayMve của thằng dnd-kit để sắp xếp lại mảng Columns ban đầu
      // Code của arrayMove ở đây: dnd-kit/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderColumns = arrayMove(
        orderedColumnsState,
        oldIndex,
        newIndex,
      );
      // 2 console.log dữ liệu này sau dùng để xử lý gọi API
      // const dndOrderedColumnsIds = dndOrderColumns.map((c) => c._id);
      // console.log('dndOrderColumns: ', dndOrderColumns);
      // console.log('dndOrderedColumnsIds: ', dndOrderedColumnsIds);

      // Cập nhật lại state clumns ban đầu sau khi kéo thả
      setOrderColumnsState(dndOrderColumns);
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#34495e' : '#1976d2',
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          p: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumnsState} />
      </Box>
    </DndContext>
  );
}

export default BoardContent;
