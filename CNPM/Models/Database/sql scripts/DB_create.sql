use [DB_Printing]

go
create table [User] (
	user_id varchar(7) check(user_id not like '%[^0-9]' and len(user_id) = 7) primary key,
	user_type nvarchar(15) not null check(user_type = 'STU' or user_type = 'TCHR'),
	[name] nvarchar(50) not null,
	dob date not null,
	sex char not null check(sex = 'F' or sex = 'M'),
	hometown nvarchar(50),
	addr nvarchar(1000),
	email varchar(100) not null check(email like '%@hcmut.edu.vn') unique,
	phone_number varchar(10) not null check(phone_number not like '%[^0-9]' and len(phone_number) = 10) unique,
	faculty nvarchar(1000) not null,
	--major nvarchar(1000) not null,
	enrolled_year int check(enrolled_year between 1957 and cast(year(getdate()) as int)),
	graduate_year int ,
	pwd varchar(1000) not null,
	[status] varchar(1000) not null default 'Actived' check([status] = 'Actived' or [status] = 'Banned'),
	transaction_id  varchar(16) not null,
	pageLeft int not null default 0 check(pageLeft >= 0),
	constraint en_gra_cond
		check(graduate_year > enrolled_year),
)
--drop table [User]
create table [Admin] (
	admin_id varchar(7) check(admin_id not like '%[^0-9]' and len(admin_id) = 7) primary key,
	[name] nvarchar(50) not null,
	email varchar(100) not null check(email like '%@hcmut.edu.vn') unique,
	phone_number varchar(10) not null check(phone_number not like '%[^0-9]%' and  len(phone_number) = 10) unique,
	time_create datetime not null default getdate(),
)
--drop table [Admin]

create table [Printer] (
	printer_id int identity(100000000,1) primary key check(printer_id between 100000000 and 199999999),
	[name] nvarchar(50) not null,
	building nvarchar(50) not null,
	[floor] int not null check ([floor] >= 0),
	brand nvarchar(50) not null,
	[des] nvarchar(50) not null default N'Không có mô tả',
	currentState nvarchar(50) not null default N'Sẵn sàng' check(currentState = N'Sẵn sàng' or currentState = N'Đang chờ' or currentState = N'Vô hiệu'),
	pagesLeft int not null default 0 check(pagesLeft >= 0),
	inkLeft decimal(5,2) not null default 100 check (inkLeft >= 0 and inkLeft <= 100.00),
	total_printed int not null default 0 check(total_printed >= 0),
	time_insert datetime not null default getdate(),
)
alter table Printer add constraint DF_ink default 100 for inkLeft
alter table Printer add constraint DF_state default N'Sẵn sàng' for currentState
-- drop table [Printer]

create table Feedback(
	feedback_id int identity(200000000,1) primary key check(feedback_id between 200000000 and 299999999),
	[user_id] varchar(7) not null,
	printer_id int not null,
	detail nvarchar(1000) not null,
	rating int not null default 5 check (rating between 0 and 5),
	time_create datetime not null default getdate()
)
--drop table Feedback

create table [Notification] (
	user_id varchar(7),
	[time] datetime default getdate(),
	detail nvarchar(1000) not null,
	constraint PK_noti
		primary key(user_id,[time])
)
--drop table [Notification]
create table [Transaction_info](
	transaction_id varchar(16) check(transaction_id not like '%[^0-9]') primary key,
	bank_name nvarchar(50) not null,
	[type] nvarchar(50) not null check([type] = 'EDU' or [type] = 'NORMAL'),
)

create table Print_log(
	user_id varchar(7),
	printer_id int,
	[time] datetime not null default getdate(),
	[file_name] varchar(1000) not null,
	no_pages int not null check(no_pages >= 1),
	constraint PK_printlog
		primary key(user_id, printer_id)
)
--drop table Buying_page_log
create table Buying_page_log(
	transaction_code int identity(300000000,1) check(transaction_code between 300000000 and 399999999) primary key,
	time_trans datetime not null default getdate(),
	no_pages int not null check(no_pages >= 0),
	user_id varchar(7) not null,
	price int not null default 0
)
 
--drop table page_setting
create table page_setting(
	default_no_pages int not null default 20,
	resetdate datetime not null default getdate(),
	page_price int not null default 1000
)


alter table [User] add constraint FK_user_transID foreign key (transaction_id) references Transaction_info(transaction_id)

alter table [Notification] add constraint FK_noti_uid foreign key (user_id) references [User](user_id)

alter table Feedback add constraint FK_fb_uid foreign key (user_id) references [User](user_id)
alter table Feedback add constraint FK_fb_pid foreign key (printer_id) references [Printer](printer_id)

alter table Print_log add constraint FK_pl_uid foreign key (user_id) references [User](user_id)
alter table Print_log add constraint FK_pl_pid foreign key (printer_id) references [Printer](printer_id)

alter table Buying_page_log add constraint FK_bl_uid foreign key (user_id) references [User](user_id)