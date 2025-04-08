# Project Boards - BackEnd

Phần BackEnd của **Project Boards** là nơi xử lý logic nghiệp vụ, quản lý cơ sở dữ liệu, và cung cấp API RESTful để giao tiếp với FrontEnd. Được xây dựng bằng Node.js và Express.js, BackEnd đảm bảo hiệu suất cao, dễ dàng mở rộng và tích hợp.

---

## Giới Thiệu

BackEnd chịu trách nhiệm cung cấp các API RESTful để quản lý bảng, cột, và thẻ. Nó sử dụng MongoDB làm cơ sở dữ liệu chính để lưu trữ dữ liệu và Mongoose để tương tác với cơ sở dữ liệu. Hệ thống được thiết kế để dễ dàng mở rộng và tích hợp với các dịch vụ khác.

---

## Tính năng

- Cung cấp API RESTful cho FrontEnd.
- Quản lý bảng, cột, và thẻ trong cơ sở dữ liệu MongoDB.
- Thêm/Xoá cột (column) và thẻ (card) mới vào cơ sở dữ liệu.
- Xác thực và kiểm tra dữ liệu đầu vào.
- Xử lý lỗi và bảo mật cơ bản.
- Hỗ trợ cấu hình môi trường thông qua file `.env`.

---

## Công nghệ sử dụng

- **Node.js**: Runtime môi trường JavaScript.
- **Express.js**: Framework xây dựng API RESTful.
- **MongoDB**: Cơ sở dữ liệu NoSQL.
- **Mongoose**: ORM để làm việc với MongoDB.
- **Joi**: Xác thực dữ liệu đầu vào.
- **dotenv**: Quản lý biến môi trường.

