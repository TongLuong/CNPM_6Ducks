USE DB_Printing
GO

-- DROP PROCEDURE insert_noti
CREATE PROCEDURE insert_noti
    @usernoti_id VARCHAR(7),
    @fn NVARCHAR(1000)
AS
BEGIN
    DECLARE @detail VARCHAR(1000) = N'Tài liệu ' + @fn + N' của bạn đã được in xong';
    INSERT INTO [Notification] VALUES (@usernoti_id, DEFAULT, @detail);
END
GO

-- DROP PROCEDURE save_log_print
CREATE PROCEDURE save_log_print
    @user_id VARCHAR(7),
    @printer_id INT,
    @file_name VARCHAR(1000),
    @time_start DATETIME
AS
BEGIN
    update Print_log 
	set time_end = getdate()
	where user_id = @user_id and printer_id = @printer_id and [file_name] = @file_name and time_start = @time_start
    EXEC insert_noti @usernoti_id = @user_id, @fn = @file_name;
END
GO
--drop procedure noti_before_print
CREATE PROCEDURE noti_before_print
    @user_id VARCHAR(7),
    @printer_id INT,
    @file_name NVARCHAR(1000),
    @no_pages INT,
	@paperType VARCHAR(3),
	@time_start DATETIME
AS
BEGIN
	INSERT INTO Print_log VALUES 
	(@user_id, @printer_id,@file_name,@no_pages,@paperType, @time_start, null)
    INSERT INTO [Notification] VALUES (@user_id, DEFAULT, N'Tài liệu ' + @file_name + N' của bạn đang được in');
END
GO

-- DROP FUNCTION check_login
CREATE FUNCTION check_login(
    @username VARCHAR(100),
    @pwd VARCHAR(1000)
)
RETURNS VARCHAR(7)
AS
BEGIN
    DECLARE @result VARCHAR(7) = NULL;

	SELECT @result = admin_id
    FROM [Admin]
    WHERE email = @username + '@hcmut.edu.vn' AND pwd = @pwd;

	IF ISNULL(@result, -1) <> -1
		RETURN @result;

    SELECT @result = user_id
    FROM [User]
    WHERE email = @username + '@hcmut.edu.vn' AND pwd = @pwd AND [status] = 'Actived';

    IF ISNULL(@result, -1) = -1
        RETURN '';

    RETURN @result;
END
GO

CREATE FUNCTION total_price(
    @no_page INT
)
RETURNS INT
AS
BEGIN
    DECLARE @total_price INT = 0;
    SET @total_price = @no_page * (SELECT page_price FROM page_setting);
    RETURN @total_price;
END
GO
--DROP FUNCTION display_log
CREATE FUNCTION display_log(
    @user_id VARCHAR(7)
)
RETURNS TABLE
AS
RETURN
(
    SELECT [file_name],building, [floor], no_pages,pl.paperType,[time_start],[time_end]
    FROM Print_log pl
    JOIN Printer p ON pl.printer_id = p.printer_id
    WHERE pl.user_id = @user_id
);
GO

--drop function display_printer_info
create function display_printer_info(@printerID int)
returns table
as
return 
(
	select [name],brand,currentState, pagesLeft, inkLeft,total_printed,[des]
	from Printer
	where printer_id = @printerID
);
go

CREATE PROCEDURE change_printer_name
@building nvarchar(50),
@floor int,
@name nvarchar(50)
AS
BEGIN
    update Printer
	set name = @name
	where building = @building and [floor]=@floor
END
GO

-- DROP PROCEDURE insert_Buying_log
CREATE PROCEDURE insert_Buying_log
    @no_page INT,
    @user_id VARCHAR(7)
AS
BEGIN
    DECLARE @totalprice INT = (SELECT dbo.total_price(@no_page) AS price);
    INSERT INTO Buying_page_log (no_pages, user_id, price)
    VALUES (@no_page, @user_id, @totalprice);
END
GO

-- DROP PROCEDURE insert_printer
CREATE PROCEDURE insert_printer
    @name NVARCHAR(50),
    @building NVARCHAR(50),
    @floor INT,
    @brand NVARCHAR(50),
    @des NVARCHAR(50) = NULL,
    @pagesLeft INT
AS
BEGIN
    IF @des IS NOT NULL
        INSERT INTO Printer (name, building, [floor], brand, [des], currentState, pagesLeft)
        VALUES (@name, @building, @floor, @brand, @des, N'Sẵn sàng', @pagesLeft);
    ELSE
        INSERT INTO Printer (name, building, [floor], brand, currentState, pagesLeft)
        VALUES (@name, @building, @floor, @brand, N'Sẵn sàng', @pagesLeft);
END
GO

create procedure change_system_setting
@default_no_pages int,
@resetdate int,
@page_price int,
@max_print_per int
as
begin
	update page_setting
	set default_no_pages = @default_no_pages,resetdate=@resetdate,page_price=@page_price,max_print_per = @max_print_per
end
go

create procedure insert_file_type
@type varchar(50)
as
begin 
	insert into file_type values (@type);
end
go

--drop procedure change_user_info
create procedure change_user_info
@user_id varchar(7),
@user_type nvarchar(15) = null,
@name nvarchar(50),
@dob date,
@sex char(1),
@hometown nvarchar(50),
@addr nvarchar(1000),
@email varchar(100),
@phone_number varchar(10),
@faculty nvarchar(1000),
@enrolled_year int,
@graduate_year int,
@pwd varchar(1000),
@status varchar(1000) = null,
@transaction_id varchar(16) = null,
@pageLeft int = null
as
begin
	update [dbo].[User]
    set [name] = @name
      ,[dob] = @dob
      ,[sex] = @sex
      ,[hometown] = @hometown
      ,[addr] = @addr
      ,[email] = @email
      ,[phone_number] = @phone_number
      ,[faculty] = @faculty
      ,[enrolled_year] = @enrolled_year
      ,[graduate_year] = @graduate_year
      ,[pwd] = @pwd
	where [user_id] = @user_id

	if @user_type is not null
	begin
		update [dbo].[User]
		set [user_type] = @user_type
		where [user_id] = @user_id
	end

	if @status is not null
	begin
		update [dbo].[User]
		set [status] = @status
		where [user_id] = @user_id
	end
	 
	if @transaction_id is not null
	begin
		update [dbo].[User]
		set [transaction_id] = @transaction_id
		where [user_id] = @user_id
	end

	if @pageLeft is not null
	begin
		update [dbo].[User]
		set [pageLeft] = @pageLeft
		where [user_id] = @user_id
	end
end
go

--drop procedure change_admin_info
create procedure change_admin_info
@admin_id varchar(7),
@name nvarchar(50),
@email varchar(100),
@phone_number varchar(10),
@pwd varchar(1000),
@bdate datetime,
@sex char(1),
@hometown nvarchar(50),
@addr nvarchar(1000)
as
begin
	update [dbo].[Admin]
    set [name] = @name
	  ,[email] = @email
	  ,[phone_number] = @phone_number
	  ,[pwd] = @pwd
	  ,[bdate] = @bdate
      ,[sex] = @sex
      ,[hometown] = @hometown
      ,[addr] = @addr
	where [admin_id] = @admin_id
end
go

-- DROP PROCEDURE change_state_printer
CREATE PROCEDURE change_state_printer
    @printer_id INT,
	@newState NVARCHAR(50)
AS
BEGIN
    UPDATE Printer
    SET currentState = @newState
    WHERE printer_id = @printer_id;
END
GO

CREATE FUNCTION display_buy_page(@userID varchar(7))
returns table
as return 
(
SELECT transaction_code,time_trans,no_pages,price
FROM Buying_page_log
WHERE user_id = @userID
)
go

CREATE FUNCTION display_total_printed_by_type
(
@user_id varchar(7)
)
returns table as
return
(
	select paperType,sum(no_pages) as numpg
	from Print_log 
	where [user_id] = @user_id
	group by paperType
)
go

create function display_notification(
@user_id varchar(7)
)
returns table as
return (
	select [time],detail
	from Notification
	where [user_id] = @user_id
	)
go

create procedure update_printer
@printer_id int,
@name nvarchar(50),
@building nvarchar(50),
@floor int,
@brand nvarchar(50),
@des nvarchar(50) = null,
@currentState nvarchar(50),
@pagesLeft int,
@inkLeft decimal(5,2)
as
begin
	update Printer
	set
	[name] = @name,
	building = @building,
	[floor] = @floor,
	brand = @brand,
	currentState = @currentState,
	pagesLeft = @pagesLeft,
	inkLeft = @inkLeft
	where printer_id = @printer_id

	if @des is not null
		update Printer set [des] = @des where printer_id = @printer_id
	else
		update Printer set [des] = default where printer_id = @printer_id
	
end

go
create procedure insert_file_type
@file_type varchar(50)
as
begin
	insert into file_type values (@file_type)
end

go
create procedure delete_file_type
@file_type varchar(50)
as
begin
	delete file_type where [type] = @file_type
end

go
create function total_print(@year int)
returns int
as
begin
	declare @res int = 0
	set @res = (select count(*) from Print_log where YEAR(time_end)  = @year)

	return @res
end

go
--drop function total_page_A4
create function total_page_A4(@year int, @mm int = null) --mm use only for graph
returns int
as
begin
	declare @res int = 0
	declare @a3 int = 0
	declare @a4 int = 0
	declare @a2 int = 0
	declare @a1 int = 0

	set @a1 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A1' and (@mm is null or MONTH(time_end) = @mm))
	set @a2 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A2' and (@mm is null or MONTH(time_end) = @mm))
	set @a3 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A3' and (@mm is null or MONTH(time_end) = @mm))
	set @a4 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A4' and (@mm is null or MONTH(time_end) = @mm))

	set @res = @a1 * 8 + @a2 * 4 + @a3 * 2 + @a4

	return @res
end

go
create function stat_total_page(@year int)
returns @res table (mm int, total_page int)
as
begin
	declare @mm int = 1

	while @mm <= 12
	begin
		insert into @res values(@mm, (select dbo.total_page_A4(@year,@mm) as num))
		set @mm = @mm + 1
	end

	return
end

go
--drop function report_by_year
create function report_by_year(@year int)
returns @res table([year] int, A1 int, A2 int, A3 int, A4 int)
as
begin
	declare @a3 int = 0
	declare @a4 int = 0
	declare @a2 int = 0
	declare @a1 int = 0

	set @a1 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A1')
	set @a2 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A2')
	set @a3 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A3')
	set @a4 = (select count(*) from Print_log where YEAR(time_end)  = @year and  paperType = 'A4')

	insert into @res values(@year, @a1,@a2,@a3,@a4)
	return
end

go

--drop function report_by_year_n_month
create function report_by_year_n_month(@year int)
returns @res table([year] int,mm int, A1 int, A2 int, A3 int, A4 int)
as
begin
	declare @a3 int = 0
	declare @a4 int = 0
	declare @a2 int = 0
	declare @a1 int = 0
	declare @mm int = 1

	while @year <= year(getdate())
	begin
		while @mm <= month(getdate()) and @mm <= 12
		begin
			set @a1 = (select count(*) from Print_log where YEAR(time_end) = @year and paperType = 'A1' and MONTH(time_end) = @mm)
			set @a2 = (select count(*) from Print_log where YEAR(time_end) = @year and paperType = 'A2' and MONTH(time_end) = @mm)
			set @a3 = (select count(*) from Print_log where YEAR(time_end) = @year and paperType = 'A3' and MONTH(time_end) = @mm)
			set @a4 = (select count(*) from Print_log where YEAR(time_end) = @year and paperType = 'A4' and MONTH(time_end) = @mm)
			insert into @res values(@year,@mm, @a1,@a2,@a3,@a4)

			set @mm = @mm + 1
		end
		set @year = @year + 1
	end
	return	
end
go