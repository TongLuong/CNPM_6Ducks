namespace CNPM.Models.Domain
{
    public class PrintLog
    {
        string userID, timeStart, timeEnd, fileName, paperType;
        public string UserID { get =>  userID; set => userID = value;}
        public string TimeStart { get => timeStart; set => timeStart = value;}
        public string TimeEnd { get => timeEnd; set => timeEnd = value;}
        public string FileName { get => fileName; set => fileName = value;}
        public string PaperType { get => paperType; set => paperType = value;}
        int printerID, numberOfPages;
        public int PrinterID { get => printerID; set => printerID = value;}
        public int NumberOfPages { get => numberOfPages; set => numberOfPages = value;}

        public PrintLog(string userId, int printerID, string fileName, int numberOfPages, string paperType, string timeStart, string timeEnd)
        {
            this.userID = userId;
            this.printerID = printerID;
            this.fileName = fileName;
            this.numberOfPages = numberOfPages;
            this.paperType = paperType;
            this.timeStart = timeStart;
            this.timeEnd = timeEnd;
        }
    }
}
