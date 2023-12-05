use DB_Printing

insert into [User]
values
('2112345','STU','Lê Minh Hải','2003-05-15','M','TP.HCM','303 Phan Xích Long, Phường 1, Quận 4, Hồ Chí Minh','sam.wilson@hcmut.edu.vn','0168374892','Khoa học máy tính',2021,2025,'4Jr&@wGz','Actived','0004100078345901',20),
('2112371','STU','Trần Nguyễn Sơn','2003-08-22','M','TP.HCM','789 Điện Biên Phủ, Phường 8, Quận 3, Hồ Chí Minh','alice.smith@hcmut.edu.vn','0932568740','Dệt may',2021,2025,'K$Xvh6Q','Actived','0004100090234156',10),
('2119876','STU','Nguyễn Thị Hương','2002-02-04','F','Đà Nẵng','456 Nguyễn Huệ, Phường 7, Quận 5, Hồ Chí Minh','linda.nguyen@hcmut.edu.vn', '0907123456','Logistic',2020,2024,'2E*D=xb5c','Banned','0004100045678912',15),
('2118765','STU','Võ Đức Tùng','2002-12-10','M','Đồng Nai','101 Cách Mạng Tháng Tám, Phường 6, Quận 9, Hồ Chí Minh','bob.jackson@hcmut.edu.vn','0885342197','Quản lý công nghiệp',2020,2024,'pNy9ZqQ*W','Actived','0004100056789023',13),
('2115432','STU','Phạm Quốc Linh','2004-07-28','F','TP.HCM','505 Trần Hưng Đạo, Phường 2, Quận 10, Hồ Chí Minh','emma.white@hcmut.edu.vn','0919345678','Cơ khí',2022,2026,'T@Fv8yZBq','Banned','0004100012347895',4),
('2110987','STU','Hoàng Minh Thảo','2004-11-05','F','Bình Dương','606 Nam Kỳ Khởi Nghĩa, Phường 5, Quận 1, Hồ Chí Minh','kevin.wang@hcmut.edu.vn','0976234501','Khoa học máy tính',2022,2026,'r9nHkJL+Yv','Actived','0004100023456789',0),
('2117654','TCHR','Trần Thị Lan','1992-01-19','F','An Giang','707 Lê Lợi, Phường 4, Quận 2, Hồ Chí Minh','john.doe@hcmut.edu.vn','0948123456','Tự động hoá',null,null,'5oGcVJt%zA','Actived','0004100089012345',22),
('2118901','TCHR','Huỳnh Hữu Quốc','1984-09-14','M','TP.HCM','202 Võ Thị Sáu, Phường 10, Quận 6, Hồ Chí Minh','olivia.green@hcmut.edu.vn','0897123456','Xây dựng',null,null,'7p3uW=Zhxv','Actived','0004100034567890',20),
('2114567','TCHR','Đặng Minh Thu','1992-06-02','F','Bến Tre','123 Lê Thánh Tôn, Phường 9, Quận 7, Hồ Chí Minh','david.kim@hcmut.edu.vn','0923568740','Kỹ thuật máy tính',null,null,'QsD&Ug-R','Actived','0004100078901234',0),
('2113210','TCHR','Bùi Văn Đức','1978-03-25','M','TP.HCM','404 Hai Bà Trưng, Phường 3, Quận 8, Hồ Chí Minh','michael.jones@hcmut.edu.vn','0851234567','Kỹ thuật máy tính',null,null,'YK2jbh6+zL','Actived','0004100045678901',17),
('2116543','TCHR','Phan Kim Thị','1980-04-12','F','TP.HCM','200 Trường Chinh, Phường 10, Quận Tân Bình, Hồ Chí Minh','susan.chen@hcmut.edu.vn','0987456213','Kỹ thuật hoá học',null,null,'eE8VkRs%hB','Actived','0004100012345678',20);

insert into [Admin]
values
('1123456','Trần Thị An','an.tran@hcmut.edu.vn','0923456789','2000-5-12'),
('1109876','Nguyễn Vân Hoàng','hoang.nguyen@hcmut.edu.vn','0987654321','2002-4-21'),
('1145678','Lê Minh Tâm','tam.le@hcmut.edu.vn','0978563412','2005-12-20');

insert into [Transaction_info]
values
('0004100078345901','OCB','EDU'),
('0004100090234156','OCB','EDU'),
('0004100056789023','OCB','EDU'),
('0004100023456789','OCB','EDU'),
('0004100034567890','OCB','EDU'),
('0004100045678901','OCB','EDU'),
('0004100012345678','OCB','EDU'),
('0004100089012345','OCB','EDU'),
('0004100078901234','OCB','EDU');

insert into Printer([name],building,[floor],brand,[des],currentState,pagesLeft,inkLeft,total_printed,time_insert)
values
('Fast LaserJet','H6',1,'Samsung',default,N'Sẵn sàng',200,100,0,'2023-12-01'),
('Wireless PhotoPrinter','H6',3,'Samsung',default,N'Đang chờ',178,89,22,'2023-11-15'),
('Colorful EcoPrinter','H6',5,'Samsung',default,N'Vô hiệu',122,56,78,'2023-11-01'),
('High-Resolution OfficeJet','H6',6,'Samsung',default,N'Sẵn sàng',14,10,186,'2023-10-01'),
('Smart LabelPrinter','H6',7,'Samsung',default,N'Sẵn sàng',46,44,154,'2023-10-15');

insert into Feedback([user_id],printer_id,detail,rating,time_create)
values
('2119876',100000001,'Máy in bị lỗi thường xuyên, cần được bảo trì',1,'2023-09-22'),
('2115432',100000002,'Máy in hay bị thiếu mực',1,'2023-10-12'),
('2119876',100000003,'Thời gian sửa chữa máy in lâu',1,'2023-09-22'),
('2117654',100000002,'Văn bản của máy in bị lỗi, cần sửa chữa',2,'2023-09-22'),
('2115432',100000002,'Sử dụng máy in này làm mất thời gian vì in không đúng yêu cầu',3,'2023-09-22'),
('2110987',100000004,'Máy in hay bị thiếu giấy, cần được chú ý hơn',4,'2023-11-25'),
('2110987',100000005,'Máy in sử dụng tốt',5,'2023-12-01');
