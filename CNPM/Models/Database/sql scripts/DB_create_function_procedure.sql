USE DB_Printing
GO

-- DROP PROCEDURE insert_noti
CREATE PROCEDURE insert_noti
    @usernoti_id VARCHAR(7),
    @fn VARCHAR(1000)
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
    @file_name VARCHAR(1000),
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

-- DROP PROCEDURE unactive_printer
CREATE PROCEDURE unactive_printer
    @printer_id INT
AS
BEGIN
    UPDATE Printer
    SET currentState = N'Vô hiệu'
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