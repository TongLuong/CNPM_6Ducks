USE [DB_Printing]
GO

-- Set time_start, time_end (tại vì đề bắt)
CREATE TRIGGER before_print
on [Print_log]
INSTEAD OF INSERT
AS
BEGIN
    DECLARE @uID INTEGER, @pID INTEGER, @fName VARCHAR(1000), @nPage INTEGER, @pType VARCHAR(3), @tStart DATETIME
    DECLARE cur_beforePrint CURSOR FOR (SELECT user_id, printer_id, file_name, no_pages, paperType from [inserted])
    OPEN cur_beforePrint
    FETCH FROM cur_beforePrint INTO @uID, @pID, @fName, @nPage, @pType
    WHILE @@FETCH_STATUS = 0
    BEGIN
        SET @tStart = DATEADD(SECOND, 1, (SELECT MAX(time_end) FROM [Print_log]))
        IF @tStart IS NULL or @tStart < GETDATE() 
        BEGIN
            SET @tStart = GETDATE()
        END
        INSERT INTO [Print_log] (user_id, printer_id, file_name, no_pages, paperType, time_start, time_end)
        VALUES (
            @uID, 
            @pID, 
            @fName,
            @nPage, 
            @pType, 
            @tStart,
            DATEADD(SECOND, @nPage / 2 , @tStart) -- assume that the time needed to print a page is 0.5s
        )

        FETCH NEXT FROM cur_beforePrint INTO @uID, @pID, @fName, @nPage, @pType
    END
    CLOSE cur_beforePrint
    DEALLOCATE cur_beforePrint
end 
GO

-- Update pages and ink left when a printing log is create
CREATE TRIGGER update_after_print
On [Print_log]
after INSERT
as
BEGIN
    DECLARE @userID INTEGER, @printerID INTEGER, @noPage INTEGER, @pType VARCHAR(3)
    DECLARE cur_afterPrint CURSOR for (SELECT user_id, printer_id, no_pages, paperType from [inserted])
    OPEN cur_afterPrint
    FETCH FROM cur_afterPrint INTO @userID, @printerID, @noPage, @pType
    WHILE @@FETCH_STATUS = 0
    BEGIN
        UPDATE [Printer]
        SET
            pagesLeft = pagesLeft - @noPage * (
                CASE
                    WHEN @pType = 'A4' THEN 1
                    WHEN @pType = 'A3' THEN 2
                    WHEN @pType = 'A2' THEN 4
                    WHEN @pType = 'A1' THEN 8
                    ELSE 16
                END
            ),
            inkLeft = inkLeft - 0.02 * @noPage * (
                CASE
                    WHEN @pType = 'A4' THEN 1
                    WHEN @pType = 'A3' THEN 2
                    WHEN @pType = 'A2' THEN 4
                    WHEN @pType = 'A1' THEN 8
                    ELSE 16
                END
            ), 
            total_printed = total_printed + 1 -- chắc đổi total thành số lượt in, số trang có thể tính sau
        WHERE printer_id = @printerID

        UPDATE [User]
        SET
            pageLeft = pageLeft - @noPage * (
                CASE
                    WHEN @pType = 'A4' THEN 1
                    WHEN @pType = 'A3' THEN 2
                    WHEN @pType = 'A2' THEN 4
                    WHEN @pType = 'A1' THEN 8
                    ELSE 16
                END
            )
        WHERE user_id = @userID        
        FETCH NEXT FROM cur_afterPrint INTO @userID, @printerID, @noPage, @pType
    END
    CLOSE cur_afterPrint
    DEALLOCATE cur_afterPrint
END
GO

CREATE TRIGGER update_user_pageleft
ON [Buying_page_log]
AFTER INSERT
AS
BEGIN
    UPDATE U
    SET U.pageLeft = U.pageLeft + (
        SELECT SUM(I.no_pages) 
        FROM [inserted] I
        WHERE U.user_id = I.user_id
        GROUP BY I.user_id
    )
    FROM [User] U INNER JOIN [inserted] I 
    ON U.user_id = I.user_id;
END
GO

