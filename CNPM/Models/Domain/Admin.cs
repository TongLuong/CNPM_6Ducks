namespace CNPM.Models.Domain
{
    public class Admin
    {
        string adminID, adminName, email, phoneNumber, timeCreate;

        public string AdminID { get => adminID; set => adminID = value;}
        public string AdminName { get => adminName; set => adminName = value;}
        public string Email { get => email; set => email = value;}
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value;}
        public string TimeCreate { get => timeCreate; set => timeCreate = value;}
        public Admin(string adminId, string adminName, string email, string phoneNumber, string timeCreate)
        {
            this.adminID = adminId;
            this.adminName = adminName;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.timeCreate = timeCreate;
        }
    }
}
