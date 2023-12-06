using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace CNPM.Controllers
{
    public class PrintingLog : Controller
    {
        SqlConnection conn;

        public PrintingLog()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult ShowPrintingLog(string userID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_log(@userID)", conn);

            cmd.Parameters.AddWithValue("@userID", userID);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> filenames = new List<string>();
            List<string> times = new List<string>();    
            List<string> printers = new List<string>();
            List<string> numberOfPages = new List<string>();

            if (dr.HasRows)
            {
                while(dr.Read())
                {
                    num++;
                    filenames.Add(dr.GetString(0));
                    times.Add(dr.GetString(1).ToString());
                    printers.Add(dr.GetString(2) + dr.GetInt32(3).ToString());
                    numberOfPages.Add(dr.GetInt32(4).ToString());
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, filename = filenames, time = times, printer = printers, numberOfPage = numberOfPages }
            );

        }

        [HttpPost]
        public void SavePrintingLog(string userID, string printerID,
                        string fileName, string noPages)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "dbo.save_log_print",
                conn
            );
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@user_id", userID);
            cmd.Parameters.AddWithValue("@printer_id", printerID);
            cmd.Parameters.AddWithValue("@file_name", fileName);
            cmd.Parameters.AddWithValue("@no_pages", noPages);

            cmd.ExecuteNonQuery();
        }
    }
}
