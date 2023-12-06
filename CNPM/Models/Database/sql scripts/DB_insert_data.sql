USE DB_Printing;

-- Inserting data into [User] table
INSERT INTO [User] VALUES
    ('2112345','STU',N'Lê Minh Hải','2003-05-15','M','TP.HCM',N'303 Phan Xích Long, Phường 1, Quận 4, Hồ Chí Minh','sam.wilson@hcmut.edu.vn','0168374892',N'Khoa học máy tính',2021,2025,'4Jr&@wGz','Actived','0004100078345901',20),
    ('2112371','STU',N'Trần Nguyễn Sơn','2003-08-22','M','TP.HCM',N'789 Điện Biên Phủ, Phường 8, Quận 3, Hồ Chí Minh','alice.smith@hcmut.edu.vn','0932568740',N'Dệt may',2021,2025,'K$Xvh6Q','Actived','0004100090234156',10),
    ('2119876','STU',N'Nguyễn Thị Hương','2002-02-04','F',N'Đà Nẵng',N'456 Nguyễn Huệ, Phường 7, Quận 5, Hồ Chí Minh','linda.nguyen@hcmut.edu.vn', '0907123456',N'Logistic',2020,2024,'2E*D=xb5c','Banned','0004100045678912',15),
    ('2118765','STU',N'Võ Đức Tùng','2002-12-10','M',N'Đồng Nai',N'101 Cách Mạng Tháng Tám, Phường 6, Quận 9, Hồ Chí Minh','bob.jackson@hcmut.edu.vn','0885342197',N'Quản lý công nghiệp',2020,2024,'pNy9ZqQ*W','Actived','0004100056789023',13),
    ('2115432','STU',N'Phạm Quốc Linh','2004-07-28','F',N'TP.HCM',N'505 Trần Hưng Đạo, Phường 2, Quận 10, Hồ Chí Minh','emma.white@hcmut.edu.vn','0919345678',N'Cơ khí',2022,2026,'T@Fv8yZBq','Banned','0004100012347895',4),
    ('2110987','STU',N'Hoàng Minh Thảo','2004-11-05','F',N'Bình Dương',N'606 Nam Kỳ Khởi Nghĩa, Phường 5, Quận 1, Hồ Chí Minh','kevin.wang@hcmut.edu.vn','0976234501',N'Khoa học máy tính',2022,2026,'r9nHkJL+Yv','Actived','0004100023456789',0),
    ('2117654','TCHR',N'Trần Thị Lan','1992-01-19','F',N'An Giang',N'707 Lê Lợi, Phường 4, Quận 2, Hồ Chí Minh','john.doe@hcmut.edu.vn','0948123456',N'Tự động hoá',NULL,NULL,'5oGcVJt%zA','Actived','0004100089012345',22),
    ('2118901','TCHR',N'Huỳnh Hữu Quốc','1984-09-14','M',N'TP.HCM',N'202 Võ Thị Sáu, Phường 10, Quận 6, Hồ Chí Minh','olivia.green@hcmut.edu.vn','0897123456',N'Xây dựng',NULL,NULL,'7p3uW=Zhxv','Actived','0004100034567890',20),
    ('2114567','TCHR',N'Đặng Minh Thu','1992-06-02','F',N'Bến Tre',N'123 Lê Thánh Tôn, Phường 9, Quận 7, Hồ Chí Minh','david.kim@hcmut.edu.vn','0923568740',N'Kỹ thuật máy tính',NULL,NULL,'QsD&Ug-R','Actived','0004100078901234',0),
    ('2113210','TCHR',N'Bùi Văn Đức','1978-03-25','M',N'TP.HCM',N'404 Hai Bà Trưng, Phường 3, Quận 8, Hồ Chí Minh','michael.jones@hcmut.edu.vn','0851234567',N'Kỹ thuật máy tính',NULL,NULL,'YK2jbh6+zL','Actived','0004100045678901',17),
    ('2116543','TCHR',N'Phan Kim Thị','1980-04-12','F',N'TP.HCM',N'200 Trường Chinh, Phường 10, Quận Tân Bình, Hồ Chí Minh','susan.chen@hcmut.edu.vn','0987456213',N'Kỹ thuật hoá học',NULL,NULL,'eE8VkRs%hB','Actived','0004100012345678',20);
GO
-- Inserting data into [Admin] table
INSERT INTO [Admin] VALUES
    ('1123456',N'Trần Thị An','an.tran@hcmut.edu.vn','0923456789','2000-5-12','123456'),
    ('1109876',N'Nguyễn Vân Hoàng','hoang.nguyen@hcmut.edu.vn','0987654321','2002-4-21','123456'),
    ('1145678',N'Lê Minh Tâm','tam.le@hcmut.edu.vn','0978563412','2005-12-20','123456');
GO

-- Inserting data into [Transaction_info] table
INSERT INTO [Transaction_info] VALUES
    ('2112345','0004100078345901','OCB','EDU'),
    ('2112371','0004100090234156','OCB','EDU'),
    ('2119876','0004100056789023','OCB','EDU'),
    ('2118765','0004100023456789','OCB','EDU'),
    ('2115432','0004100034567890','OCB','EDU'),
    ('2110987','0004100045678901','OCB','EDU'),
    ('2117654','0004100012345678','OCB','EDU'),
    ('2118901','0004100089012345','OCB','EDU'),
    ('2114567','0004100078901234','OCB','EDU'),
    ('2113210','0004100012347895','OCB','EDU'),
    ('2116543','0004100045678912','OCB','EDU');
GO

-- Inserting data into [Printer] table
INSERT INTO [Printer] VALUES
    ('Fast LaserJet','H6',1,'Samsung',DEFAULT,N'Sẵn sàng',200,100,0,'2023-12-01'),
    ('Wireless PhotoPrinter','H6',3,'Samsung',DEFAULT,N'Đang chờ',178,89,22,'2023-11-15'),
    ('Colorful EcoPrinter','H6',5,'Samsung',DEFAULT,N'Vô hiệu',122,56,78,'2023-11-01'),
    ('High-Resolution OfficeJet','H6',6,'Samsung',DEFAULT,N'Sẵn sàng',14,10,186,'2023-10-01'),
    ('Smart LabelPrinter','H6',7,'Samsung',DEFAULT,N'Sẵn sàng',46,44,154,'2023-10-15');
GO

-- Inserting data into [Feedback] table
INSERT INTO [Feedback] VALUES
    ('2119876',100000001,N'Máy in bị lỗi thường xuyên, cần được bảo trì',1,'2023-09-22'),
    ('2115432',100000002,N'Máy in hay bị thiếu mực',1,'2023-10-12'),
    ('2119876',100000003,N'Thời gian sửa chữa máy in lâu',1,'2023-09-22'),
    ('2117654',100000002,N'Văn bản của máy in bị lỗi, cần sửa chữa',2,'2023-09-22'),
    ('2115432',100000002,N'Sử dụng máy in này làm mất thời gian vì in không đúng yêu cầu',3,'2023-09-22'),
    ('2110987',100000004,N'Máy in hay bị thiếu giấy, cần được chú ý hơn',4,'2023-11-25'),
    ('2110987',100000000,N'Máy in sử dụng tốt',5,'2023-12-01');
GO

-- Inserting data into [page_setting] table
INSERT INTO page_setting VALUES(DEFAULT, DEFAULT, DEFAULT);