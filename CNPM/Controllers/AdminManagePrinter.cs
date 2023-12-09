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
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-printer.cshtml");
        }

        public JsonResult DisplayAllPrinter()
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT building,floor,currentState FROM Printer", conn);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> buildings = new List<string>();
            List<string> floors = new List<string>();
            List<string> currentStates = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    buildings.Add(dr.GetString(0));
                    currentStates.Add(dr.GetString(2));
                    floors.Add(dr.GetInt32(1).ToString());
                }
            }

            conn.Close();

            return new JsonResult(
                new { building = buildings, floor = floors, currentState = currentStates });
        }

        public JsonResult ShowPrinter(string building, string floorStr)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            int floor = Int32.Parse(floorStr);

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_printer_info(@building,@floor)", conn);

            cmd.Parameters.AddWithValue("@building", building);
            cmd.Parameters.AddWithValue("@floor", floor);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> names = new List<string>();
            List<string> brands = new List<string>();
            List<string> currentStates = new List<string>();
            List<string> pagesLeft = new List<string>();
            List<string> inksLeft = new List<string>();
            List<string> totalPrinteds = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    names.Add(dr.GetString(0));
                    brands.Add(dr.GetString(1));
                    currentStates.Add(dr.GetString(2));
                    pagesLeft.Add(dr.GetInt32(3).ToString());
                    inksLeft.Add(dr.GetDecimal(4).ToString());
                    totalPrinteds.Add(dr.GetInt32(5).ToString());
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, name = names, brand = brands, currentState = currentStates, pageLeft = pagesLeft, inkLeft = inksLeft, totalPrinted = totalPrinteds }
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
    }
}
