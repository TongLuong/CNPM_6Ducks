namespace CNPM.Models.Domain
{
    public class Notification
    {
        string userID, time, detail;
        public string UserID { get => userID; set => userID = value; }
        public string Time { get => time; set => time = value; }
        public string Detail { get => detail; set => detail = value; }
        public Notification(string userId, string time, string detail)
        {
            this.userID = userId;
            this.time = time;
            this.detail = detail;
        }
    }
}
