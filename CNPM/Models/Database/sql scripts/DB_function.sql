use DB_Printing

go
create procedure insert_noti
@usernoti_id varchar(7)
as
begin
	insert into [Notification] values (@usernoti_id, getdate(), N'Tài liệu của bạn đã được in xong')
end
go
create procedure save_log_print(
@user_id varchar(7),
@printer_id int,
@file_name varchar(1000),
@no_pages int,
@success bit = 'False' output
)
as
begin
	insert into Print_log values(@user_id,@printer_id,getdate(),@file_name,@no_pages)
	exec insert_noti @usernoti_id = @user_id
end
go
/*create trigger insert_noti_for_print
@usernoti_id varchar(7)
as
begin
	select * from User
end*/

go

create function check_login(
@username varchar(100),
@pwd varchar(1000)
)
returns bit as
begin
	if not exists (select * from [User] where  email = @username + '@hcmut.edu.vn' and pwd = @pwd)
		return 'False'
	return 'True'
end

