# Smart Printing Service - 6DUCKS

## Giới Thiệu

**Smart Printing Service** là một dịch vụ in ấn thông minh được xây dựng để cung cấp trải nghiệm in ấn từ xa hiệu quả và thuận lợi. Dựa vào trang web, dịch vụ này hỗ trợ cả người dùng (user) và quản trị viên (admin) trong quá trình in ấn và quản lý máy in.

## Chức Năng Chính

### Đối Với Người Dùng (User)

1. **Tải Lên và Chỉnh Sửa Tài Liệu:**
   - Người dùng có thể dễ dàng tải lên các tài liệu cần in và thậm chí chỉnh sửa chúng trước khi in.

2. **Tùy Chọn In Đa Dạng:**
   - Cung cấp nhiều tùy chọn in, bao gồm kích thước giấy, chất lượng in, màu sắc, và các tùy chọn khác để đáp ứng đa dạng nhu cầu in ấn.

3. **Xem Trước Tài Liệu:**
   - Người dùng có thể xem trước tài liệu trước khi quyết định in để đảm bảo rằng kết quả in đáp ứng mong đợi.

4. **Theo Dõi Trạng Thái In:**
   - Cung cấp tính năng theo dõi trực tuyến, giúp người dùng kiểm tra trạng thái của công việc in và biết khi nào có thể nhận tài liệu.

### Đối Với Quản Trị Viên (Admin)

1. **Quản Lý Máy In:**
   - Admin có thể thêm, xóa, hoặc cập nhật thông tin về các máy in được liên kết với dịch vụ, đảm bảo rằng chỉ những máy in đáng tin cậy được sử dụng.

2. **Kiểm Soát Quyền Truy Cập:**
   - Quản lý quyền truy cập của người dùng, đảm bảo rằng chỉ những người được phép có thể sử dụng dịch vụ in ấn.

3. **Theo Dõi Thống Kê:**
   - Thu thập dữ liệu về hoạt động in ấn để cung cấp báo cáo và thống kê hữu ích, giúp quản trị viên hiểu rõ về việc sử dụng dịch vụ.

## Hướng Dẫn Sử Dụng

### Người Dùng (User)

1. **Đăng Nhập hoặc Đăng Ký:**
   - Truy cập trang web và đăng nhập hoặc đăng ký tài khoản mới.

2. **Lựa chọn máy in, tải Lên và Chỉnh Sửa:**
   - Lựa chọn máy in tùy theo khu vực trên hệ thống, tải lên tài liệu cần in và sử dụng các công cụ chỉnh sửa nếu cần.

3. **Xem Trước và Gửi Công Việc In:**
   - Xem trước tài liệu và gửi công việc in.

4. **Theo Dõi Trạng Thái In:**
   - Theo dõi trạng thái của công việc in để biết khi nào có thể nhận tài liệu.

### Quản Trị Viên (Admin)

1. **Quản Lý Máy In:**
   - Thêm, xóa, hoặc cập nhật thông tin về máy in.

2. **Kiểm Soát Quyền Truy Cập:**
   - Quản lý quyền truy cập của người dùng để đảm bảo tính bảo mật.

3. **Xem Báo Cáo và Thống Kê:**
   - Xem các báo cáo và thống kê để hiểu rõ về việc sử dụng dịch vụ.

## Hướng dẫn cài đặt
1. **Clone project** : sử dụng `git clone` để clone project.
3. **Upload cơ sở dữ liệu** : tìm kiếm file bacpac theo đường dẫn sau *CNPM/Models/Database/bacpac/DB_Printing.bacpac* - đây là file chứa cấu trúc và dữ liệu của hệ thống cơ sở dữ liệu, tiếp đó import vào SQL Server Management với tên *DB_Printing*.
4. **Điều chỉnh đường dẫn kết nối cơ sở dữ liệu** : tìm kiếm file config theo đường dẫn sau *CNPM/wwwroot/app.config* và thay đổi tham số connectionString phù hợp để kết nối đến database server.
5. **Nền tảng phát triển** : dự án được phát triển trên nền *ASP.NET Core MVC*.
