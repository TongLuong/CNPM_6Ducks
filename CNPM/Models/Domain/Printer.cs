namespace CNPM.Models.Domain
{
    public class Printer
    {
        int printerID, floor, pagesLeft, inkLeft, totalPrinted;
        string printerName, building, brand, des, currentState, timeInsert;
        public int PrinterID { get => printerID; set => printerID = value; }
        public string PrinterName { get => printerName; set => printerName = value; }
        public string Building { get => building; set => building = value; }
        public int Floor { get => floor; set => floor = value; }
        public string Brand { get => brand; set => brand = value; }
        public string Des { get => des; set => des = value; }
        public string CurrentState { get => currentState; set => currentState = value; }
        public int PagesLeft { get => pagesLeft; set => pagesLeft = value; }
        public int InkLeft { get => inkLeft; set => inkLeft = value; }
        public int TotalPrinted { get => totalPrinted; set => totalPrinted = value; }
        public string TimeInsert { get => timeInsert; set => timeInsert = value; }

        public Printer(int printerID, string printerName, string building, int floor, string brand, string des, string currentState, int pagesLeft, int inkLeft, int totalPrinted, string timeInsert)
        {
            this.printerID = printerID;
            this.printerName = printerName;
            this.building = building;
            this.floor = floor;
            this.brand = brand;
            this.des = des;
            this.currentState = currentState;
            this.pagesLeft = pagesLeft;
            this.inkLeft = inkLeft;
            this.totalPrinted = totalPrinted;
            this.timeInsert = timeInsert;
        }

    }
}
