use DB_Printing

go
--drop procedure insert_noti
create procedure insert_noti
@usernoti_id varchar(7),
@fn varchar(1000)
as
begin
	declare @detail varchar(1000) = N'Tài liệu '+@fn + N' của bạn đã được in xong'
	insert into [Notification] values (@usernoti_id, default,@detail )
end
go
--drop procedure save_log_print
create procedure save_log_print(
@user_id varchar(7),
@printer_id int,
@file_name varchar(1000),
@no_pages int,
@success bit = 'False' output
)
as
begin
	insert into Print_log values(@user_id,@printer_id,default,@file_name,@no_pages)
	exec insert_noti @usernoti_id = @user_id, @fn = @file_name
	set @success = 'True'
end
go


create trigger insert_noti_for_print
on Print_log
for insert
as
begin
	declare cur Cursor for (select [user_id],[file_name] from inserted)
	declare @user_id varchar(7)
	declare @file_name varchar(1000)
	open cur
	fetch next from cur into @user_id, @file_name
	while @@FETCH_STATUS = 0
	begin
		insert into [Notification] values(@user_id,default,N'Tài liệu '+@file_name+N' của bạn đang được in')
		fetch next from cur into @user_id, @file_name
	end
	close cur
	deallocate cur
end

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
go

create function total_price(
@no_page int
)
returns int as
begin
	declare @total_price int = 0
	set @total_price = @no_page * (select page_price from page_setting)
	return @total_price
end

go

create function display_log (
@user_id varchar(7)
)
returns table as
return (
	select [file_name],[time],building,[floor],no_pages
	from Print_log pl, Printer p
	where pl.printer_id = p.printer_id and pl.user_id = @user_id
)