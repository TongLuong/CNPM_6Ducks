CREATE DATABASE [DB_Printing]
GO

USE [DB_Printing]
GO

IF OBJECT_ID(N'dbo.User', N'U') IS NULL
CREATE TABLE [User] (
    user_id VARCHAR(7) PRIMARY KEY CHECK (user_id NOT LIKE '%[^0-9]%' AND LEN(user_id) = 7),
    user_type NVARCHAR(15) NOT NULL CHECK (user_type = 'STU' OR user_type = 'TCHR'),
    [name] NVARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    sex CHAR NOT NULL CHECK (sex IN ('F', 'M')),
    hometown NVARCHAR(50),
    addr NVARCHAR(1000),
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email LIKE '%@hcmut.edu.vn'),
    phone_number VARCHAR(10) NOT NULL UNIQUE CHECK (phone_number NOT LIKE '%[^0-9]' AND LEN(phone_number) = 10),
    faculty NVARCHAR(1000) NOT NULL,
    -- major NVARCHAR(1000) NOT NULL,
    enrolled_year INTEGER CHECK (enrolled_year BETWEEN 1957 AND CAST(YEAR(GETDATE()) AS INT)),
    graduate_year INT,
    pwd VARCHAR(1000) NOT NULL,
    [status] VARCHAR(1000) NOT NULL DEFAULT 'Actived' CHECK ([status] IN ('Actived', 'Banned')),
    transaction_id VARCHAR(16) NOT NULL,
    pageLeft INTEGER NOT NULL DEFAULT 0 CHECK (pageLeft >= 0),

    CONSTRAINT en_gra_cond CHECK (graduate_year > enrolled_year)
)
GO

IF OBJECT_ID(N'dbo.Admin', N'U') IS NULL
CREATE TABLE [Admin] (
    admin_id VARCHAR(7) PRIMARY KEY CHECK (admin_id NOT LIKE '%[^0-9]' AND LEN(admin_id) = 7),
    [name] NVARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE CHECK (email LIKE '%@hcmut.edu.vn'),
    phone_number VARCHAR(10) NOT NULL UNIQUE CHECK (phone_number NOT LIKE '%[^0-9]%' AND LEN(phone_number) = 10),
    time_create DATETIME NOT NULL DEFAULT GETDATE(),
)
ALTER TABLE [Admin] ADD [pwd] VARCHAR(1000) NOT NULL
GO

IF OBJECT_ID(N'dbo.Printer', N'U') IS NULL
CREATE TABLE [Printer] (
    printer_id INTEGER IDENTITY(100000000, 1) PRIMARY KEY CHECK (printer_id BETWEEN 100000000 AND 199999999),
    [name] NVARCHAR(50) NOT NULL,
    building NVARCHAR(50) NOT NULL,
    [floor] INTEGER NOT NULL CHECK ([floor] >= 0),
    brand NVARCHAR(50) NOT NULL,
    [des] NVARCHAR(50) NOT NULL DEFAULT N'Không có mô tả',
    currentState NVARCHAR(50) NOT NULL DEFAULT N'Sẵn sàng' CHECK (currentState IN (N'Sẵn sàng', N'Đang chờ', N'Vô hiệu')),
    pagesLeft INTEGER NOT NULL DEFAULT 0 CHECK (pagesLeft >= 0),
    inkLeft DECIMAL(5, 2) NOT NULL DEFAULT 100 CHECK (inkLeft >= 0 AND inkLeft <= 100.00),
    total_printed INTEGER NOT NULL DEFAULT 0 CHECK (total_printed >= 0),
    time_insert DATETIME NOT NULL DEFAULT GETDATE(),
)
GO


IF OBJECT_ID(N'dbo.Feedback', N'U') IS NULL
CREATE TABLE Feedback (
    feedback_id INTEGER IDENTITY(200000000, 1) PRIMARY KEY CHECK (feedback_id BETWEEN 200000000 AND 299999999),
    user_id VARCHAR(7) NOT NULL,
    printer_id INTEGER NOT NULL,
    detail NVARCHAR(1000) NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 0 AND 5),
    time_create DATETIME NOT NULL DEFAULT GETDATE()
)
ALTER TABLE Feedback ADD CONSTRAINT FK_fb_uid FOREIGN KEY (user_id) REFERENCES [User](user_id)
ALTER TABLE Feedback ADD CONSTRAINT FK_fb_pid FOREIGN KEY (printer_id) REFERENCES [Printer](printer_id)
GO


IF OBJECT_ID(N'dbo.Notification', N'U') IS NULL
CREATE TABLE [Notification] (
    user_id VARCHAR(7),
    [time] DATETIME DEFAULT GETDATE(),
    detail NVARCHAR(1000) NOT NULL,

    CONSTRAINT PK_noti PRIMARY KEY (user_id, [time])
)
GO


IF OBJECT_ID(N'dbo.Transaction_info', N'U') IS NULL
CREATE TABLE [Transaction_info] (
    user_id VARCHAR(7), -- new
    transaction_id VARCHAR(16) CHECK (transaction_id NOT LIKE '%[^0-9]'), -- modified
    bank_name NVARCHAR(50) NOT NULL,
    [type] NVARCHAR(50) NOT NULL CHECK ([type] IN ('EDU', 'NORMAL')),

    FOREIGN KEY (user_id) REFERENCES [User](user_id),
)
GO


IF OBJECT_ID(N'dbo.Print_log', N'U') IS NULL
CREATE TABLE Print_log (
    user_id VARCHAR(7),
    printer_id INT,
    -- [time] DATETIME NOT NULL DEFAULT GETDATE(),
    file_name VARCHAR(1000) NOT NULL,
    no_pages INTEGER NOT NULL CHECK (no_pages >= 1),

    paperType VARCHAR(3) NOT NULL, -- new
    time_start DATETIME DEFAULT GETDATE(), -- new
    time_end DATETIME -- new

    -- CONSTRAINT PK_printlog PRIMARY KEY (user_id, printer_id) -- Lo 1 nguoi in 1 may 2 3 lan thi sao?
)
ALTER TABLE Print_log ADD CONSTRAINT FK_pl_uid FOREIGN KEY (user_id) REFERENCES [User](user_id)
ALTER TABLE Print_log ADD CONSTRAINT FK_pl_pid FOREIGN KEY (printer_id) REFERENCES [Printer](printer_id)
GO


IF OBJECT_ID(N'dbo.Buying_page_log', N'U') IS NULL
CREATE TABLE Buying_page_log (
    transaction_code INTEGER IDENTITY(300000000, 1) CHECK (transaction_code BETWEEN 300000000 AND 399999999) PRIMARY KEY,
    time_trans DATETIME NOT NULL DEFAULT GETDATE(),
    no_pages INTEGER NOT NULL CHECK (no_pages >= 0),
    user_id VARCHAR(7) NOT NULL,
    price INTEGER NOT NULL DEFAULT 0
)
ALTER TABLE Buying_page_log ADD CONSTRAINT FK_bl_uid FOREIGN KEY (user_id) REFERENCES [User](user_id)
GO


IF OBJECT_ID(N'dbo.page_setting', N'U') IS NULL
CREATE TABLE page_setting (
    default_no_pages INTEGER NOT NULL DEFAULT 20,
    resetdate DATETIME NOT NULL DEFAULT GETDATE(),
    page_price INTEGER NOT NULL DEFAULT 1000,
)
GO
ALTER TABLE page_setting add max_print_per int not null default 100
ALTER TABLE page_setting drop constraint [DF__page_sett__reset__74AE54BC]
ALTER TABLE page_setting drop column resetdate
ALTER TABLE page_setting ADD resetdate int not null default 4

IF OBJECT_ID(N'dbo.file_type', N'U') IS NULL
CREATE TABLE file_type (
    [type] varchar(50) primary key check([type] like '.%')
)
GO
