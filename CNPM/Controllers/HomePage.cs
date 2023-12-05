using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class HomePage : Controller
    {
        private SqlConnection conn;

        public HomePage()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public IActionResult Index()
        {
            return View("/Views/User/index.cshtml");
        }

        public IActionResult UserBuyPage()
        {
            return View("/Views/User/UserBuyPage/index.cshtml");
        }

        public IActionResult UserChangeInfo()
        {
            return View("/Views/User/UserChangeInfo/index.cshtml");
        }

        public IActionResult UserNotification()
        {
            return View("/Views/User/UserNotification/index.cshtml");
        }

        public IActionResult UserPrinting()
        {
            return View("/Views/User/UserPrinting/index.cshtml");
        }

        public IActionResult UserPrintingHistory()
        {
            return View("/Views/User/UserPrintingHistory/index.cshtml");
        }

        public JsonResult CheckLogin(string username, string password)
        {
            // TODO
            // check username and pwd using function from model
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand func = new SqlCommand("SELECT dbo.check_login(@username, @pwd)",
                conn);

            if (username != null)
            {
                func.Parameters.AddWithValue("@username", username);
                func.Parameters.AddWithValue("@pwd", password == null ? DBNull.Value : password);
            }
            string id = (string)func.ExecuteScalar();
            //return Content("result: " + result.ToString() + " " + username + " " + email + " " + pwd);

            conn.Close();

            return new JsonResult
            (
                new { userID = id }
            );
            /*if (result)
                return RedirectToAction("Index", "HomePage");
            else
                return RedirectToAction("Index", "HomePageNoUser");*/
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
