namespace CNPM.Models.Domain
{
    public class PrintLog
    {
        string userID, time, fileName;
        int printerID, numberOfPages;
        public string UserID { get =>  userID; set => userID = value;}
        public string Time { get => time; set => time = value;}
        public int PrinterID { get => printerID; set => printerID = value;}
        public string FileName { get => fileName; set => fileName = value;}
        public int NumberOfPages { get => numberOfPages; set => numberOfPages = value;}

        public PrintLog(string userId,int printerID, string time, string fileName, int numberOfPages)
        {
            this.userID = userId;
            this.printerID = printerID;
            this.time = time;
            this.fileName = fileName;
            this.numberOfPages = numberOfPages;
        }
    }
}
