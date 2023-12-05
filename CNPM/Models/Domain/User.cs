namespace CNPM.Models.Domain
{
    public class User
    {
        string userID, userType, userName, dob, sex, hometown, addr, email, phoneNumber, faculty, pwd, status, transactionID;
        int enrolledYear, graduateYear, pagesLeft;

        public string UserID { get =>  userID; set => userID = value; }
        public string UserType { get => userType; set => userType = value; }
        public string UserName { get => userName; set => userName = value; }
        public string Dob { get => dob; set => dob = value; }
        public string Sex { get => sex; set => sex = value; }
        public string Hometown { get => hometown; set => hometown = value; }
        public string Addr { get => addr; set => addr = value; }
        public string Email { get => email; set => email = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public string Faculty { get => faculty; set => faculty = value; }
        public string Pwd { get => pwd; set => pwd = value; }
        public string Status { get => status; set => status = value; }
        public string TransactionID { get => transactionID; set => transactionID = value; }
        public int EnrolledYear { get => enrolledYear; set => enrolledYear = value; }
        public int GraduateYear { get => graduateYear; set => graduateYear = value; }
        public int PagesLeft { get => pagesLeft; set => pagesLeft = value; }

        public User(string userID,string userType,string userName, string dob, string sex,string hometown, string addr, string email, string phoneNumber, string faculty, int enrolledYear, int graduateYear, string pwd, string status, string transactionID, int pagesLeft)
        {
            this.userID = userID;
            this.userType = userType;
            this.userName = userName;
            this.dob = dob;
            this.sex = sex;
            this.hometown = hometown;
            this.addr = addr;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.faculty = faculty;
            this.enrolledYear = enrolledYear;
            this.graduateYear = graduateYear;
            this.pwd = pwd;
            this.status = status;
            this.transactionID = transactionID;
            this.pagesLeft = pagesLeft;
        }
    }
}
