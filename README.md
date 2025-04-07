# Project Boards - MERN Stack

Project Boards là một ứng dụng quản lý công việc và dự án, dựa trên ứng dụng Trello. Dự án hỗ trợ các tính năng như quản lý bảng (boards), cột (columns), và thẻ (cards) với khả năng kéo thả (drag-and-drop) mượt mà

---

## Giới Thiệu

Project Boards là một ứng dụng quản lý công việc và dự án trực quan, được thiết kế để giúp bạn tổ chức và theo dõi công việc một cách hiệu quả. Lấy cảm hứng từ Trello – một công cụ quản lý nổi tiếng, Project Boards mang đến trải nghiệm tương tự nhưng với khả năng tùy chỉnh cao hơn, phù hợp với nhu cầu cá nhân hoặc nhóm nhỏ.

Ứng dụng cho phép bạn tạo và quản lý các bảng, cột, và thẻ với giao diện kéo thả hiện đại. Được xây dựng trên nền tảng MERN Stack (MongoDB, Express, React, Node.js), Project Boards không chỉ cung cấp các tính năng quản lý công việc cơ bản mà còn cho phép mở rộng và tùy chỉnh theo nhu cầu cụ thể của bạn.

Đây là một giải pháp lý tưởng cho những ai muốn tự xây dựng một công cụ quản lý công việc phù hợp với quy trình làm việc của mình, đồng thời học hỏi và thực hành các công nghệ hiện đại trong phát triển ứng dụng web.

---

## Cấu Trúc Dự Án

Dự án được chia thành hai phần chính:

### FrontEnd

- **Nhánh (Branch):** [FrontEnd](https://github.com/ldnguyen2901/Trello-Clone/tree/Frontend)
- **Chức năng chính:**
  - Giao diện người dùng với React.
  - Kéo thả cột và thẻ bằng thư viện `dnd-kit`.
  - Quản lý trạng thái với Redux (nếu cần).
  - Giao tiếp với API thông qua Axios.

### BackEnd

- **Nhánh (Branch):** [BackEnd](https://github.com/ldnguyen2901/Trello-Clone/tree/Backend)
- **Chức năng chính:**
  - API RESTful với Express.js.
  - Kết nối cơ sở dữ liệu MongoDB.
  - Xử lý logic nghiệp vụ (services, models).
  - Xác thực và kiểm tra dữ liệu (validations).

---
