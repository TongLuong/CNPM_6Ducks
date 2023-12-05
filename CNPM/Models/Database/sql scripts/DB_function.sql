use DB_Printing

go
--drop procedure insert_noti
create procedure insert_noti -- ignore, just use in save_log_print
@usernoti_id varchar(7),
@fn varchar(1000)
as
begin
	declare @detail varchar(1000) = N'Tài liệu '+@fn + N' của bạn đã được in xong'
	insert into [Notification] values (@usernoti_id, default,@detail )
end
go
--drop procedure save_log_print
create procedure save_log_print( --pls redisplay notification after save log
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
create procedure noti_before_print --run before run save_log_print, pls redisplay noti after run this
@user_id varchar(7),
@file_name varchar(1000)
as
begin
	insert into [Notification] values(@user_id,default,N'Tài liệu '+@file_name+N' của bạn đang được in')
end
go
--drop function check_login
create function check_login(
@username varchar(100),
@pwd varchar(1000)
)
returns bit as
begin
	if not exists (select * from [User] where  email = @username + '@hcmut.edu.vn' and pwd = @pwd and [status] = 'Actived')
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
go
create procedure insert_Buying_log(
@no_page int,
@user_id varchar(7)
)
as
begin
	declare @totalprice int = (select dbo.total_price (@no_page) as price )
	insert into Buying_page_log (no_pages,user_id,price) 
	values
	(@no_page,@user_id,@totalprice)

end

go
create procedure insert_printer(
@name nvarchar(50),
@building nvarchar(50),
@floor int,
@brand nvarchar(50),
@des nvarchar(50) = null,
@pagesLeft int
)
as
begin
	if @des is not null
		insert into Printer (name,building,[floor],brand,[des],currentState,pagesLeft)
		values
		(@name,@building,@floor,@brand,@des,N'Sẵn sàng',@pagesLeft);
	else 
		insert into Printer (name,building,[floor],brand,currentState,pagesLeft)
		values
		(@name,@building,@floor,@brand,N'Sẵn sàng',@pagesLeft);
end

go
create procedure unactive_printer
@printer_id int
as
begin
	update Printer
	set currentState = N'Vô hiệu'
	where printer_id = @printer_id
end
go