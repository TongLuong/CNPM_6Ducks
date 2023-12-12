using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using System.Data.Common;
using CNPM.Models.Domain;

namespace CNPM.Controllers
{
    public class AdminManagePrinter : Controller
    {

        SqlConnection conn;

        public AdminManagePrinter()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
        }
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-printer.cshtml");
        }

        public JsonResult DisplayAllPrinter()
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT building,floor,currentState,printer_id FROM Printer", conn);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> buildings = new List<string>();
            List<string> floors = new List<string>();
            List<string> currentStates = new List<string>();
            List<string> printer_id = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    buildings.Add(dr.GetString(0));
                    floors.Add(dr.GetInt32(1).ToString());
                    currentStates.Add(dr.GetString(2));
                    printer_id.Add(dr.GetInt32(3).ToString());
                }
            }

            conn.Close();

            return new JsonResult(
                new { building = buildings, floor = floors, 
                    currentState = currentStates, printerID = printer_id });
        }

        public JsonResult ShowPrinter(string printerID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_printer_info(@printerID)", conn);

            cmd.Parameters.AddWithValue("@printerID", printerID);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            string names= "";
            string brands= "";
            string currentStates= "";
            string pagesLeft= "";
            string inksLeft= "";
            string totalPrinteds= "";
            string description= "";

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    names = dr.GetString(0);
                    brands = dr.GetString(1);
                    currentStates = dr.GetString(2);
                    pagesLeft = dr.GetInt32(3).ToString();
                    inksLeft = dr.GetDecimal(4).ToString();
                    totalPrinteds = dr.GetInt32(5).ToString();
                    description = dr.GetString(6).ToString();
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, name = names, brand = brands, 
                    currentState = currentStates, pageLeft = pagesLeft, 
                    inkLeft = inksLeft, totalPrinted = totalPrinteds,
                    des = description
                }
            );

        }

        public void ChangePrinterName(string building, int floor, string newName)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "dbo.change_printer_name",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@building", building);
            cmd.Parameters.AddWithValue("@floor", floor);
            cmd.Parameters.AddWithValue("@name", newName);

            cmd.ExecuteNonQuery();

            conn.Close();
        }

        public void ChangePrinterState(string printerID, string newState)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "[dbo].[change_state_printer]"
                , conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@printer_id", printerID);
            cmd.Parameters.AddWithValue("@newState", newState);

            cmd.ExecuteNonQuery();

            conn.Close();
        }

        public void AddPrinter(string name, string building,
            string floor, string brand, string des, string pagesLeft)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "[dbo].[insert_printer]"
                , conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@name", name);
            cmd.Parameters.AddWithValue("@building", building);
            cmd.Parameters.AddWithValue("@floor", floor);
            cmd.Parameters.AddWithValue("@brand", brand);
            cmd.Parameters.AddWithValue("@des", des);
            cmd.Parameters.AddWithValue("@pagesLeft", pagesLeft);

            cmd.ExecuteNonQuery();

            conn.Close();
        }
    }
}
