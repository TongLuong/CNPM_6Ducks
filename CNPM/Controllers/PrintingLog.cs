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
            /*if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM Print_log pl JOIN Printer p ON pl.printer_id = p.printer_id WHERE pl.user_id = @userID", conn);

            cmd.Parameters.AddWithValue("@userID", userID);

            SqlDataReader dr = cmd.ExecuteReader();
            List<string >*/
            return null;
        }

        [HttpPost]
        public void SavePrintingLog(string userID, string printerID,
                        string fileName, string noPages)
        {
            // TODO
            // check username and pwd using function from model
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "EXEC save_log_print @user_id=" + userID +
                ",@printer_id=" + printerID +
                ",@file_name=" + fileName +
                ",no_pages=" + noPages,
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.ExecuteNonQuery();
        }
    }
}
