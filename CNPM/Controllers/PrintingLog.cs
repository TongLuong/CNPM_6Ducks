using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;

namespace CNPM.Controllers
{
    public class PrintingLog : Controller
    {
        SqlConnection conn;

        public PrintingLog()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
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
            List<string> startTimes = new List<string>(), endTimes = new List<string>();    
            List<string> printers = new List<string>();
            List<string> numberOfPages = new List<string>();
            List<string> paperTypes = new List<string>();
            List<string> totals = new List<string>();

            if (dr.HasRows)
            {
                while(dr.Read())
                {
                    num++;
                    filenames.Add(dr.GetString(0));
                    printers.Add(dr.GetString(1) + dr.GetInt32(2).ToString());
                    numberOfPages.Add(dr.GetInt32(3).ToString());
                    paperTypes.Add(dr.GetString(4));
                    startTimes.Add(dr.GetDateTime(5).ToString("yyyy'-'MM'-'dd' 'HH':'mm':'ss"));
                    endTimes.Add(dr.GetDateTime(6).ToString("yyyy'-'MM'-'dd' 'HH':'mm':'ss"));
                }
            }
            conn.Close();

            return new JsonResult
            (
                new { number = num, filename = filenames, printer = printers, numberOfPage = numberOfPages, paperType = paperTypes, startTime = startTimes, endTime = endTimes }
            );

        }

        public JsonResult ShowTotalPrintedByType(string userID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_total_printed_by_type(@userID)", conn);

            cmd.Parameters.AddWithValue("@userID", userID);
            SqlDataReader dr = cmd.ExecuteReader();
            string res = string.Empty;
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    res += dr.GetString(0) + " : " + dr.GetInt32(1).ToString() + " trang<br>";
                }
            }

            conn.Close();
            return new JsonResult(new {result = res});
        }

        [HttpPost]
        public void SavePrintingLog(string userID, string printerID,
                        string fileName, string noPages, string paperType)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            DateTime localDate = DateTime.Now;
            SqlCommand cmd = new SqlCommand
            (
                "dbo.noti_before_print",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;
            string tempTime = localDate.ToString("yyyy'-'MM'-'dd' 'HH':'mm':'ss");

            cmd.Parameters.AddWithValue("@user_id", userID);
            cmd.Parameters.AddWithValue("@printer_id", printerID);
            cmd.Parameters.AddWithValue("@file_name", fileName);
            cmd.Parameters.AddWithValue("@no_pages", noPages);
            cmd.Parameters.AddWithValue("@paperType", paperType);
            cmd.Parameters.AddWithValue("@time_start", tempTime);

            cmd.ExecuteNonQuery();

            //====================================================
            cmd = new SqlCommand
            (
                "dbo.save_log_print",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@user_id", userID);
            cmd.Parameters.AddWithValue("@printer_id", printerID);
            cmd.Parameters.AddWithValue("@file_name", fileName);
            cmd.Parameters.AddWithValue("@time_start", tempTime);
            
            cmd.ExecuteNonQuery();

            conn.Close();
        }

        [HttpPost]
        public void Print(string fileName)
        {
            ProcessStartInfo info = new ProcessStartInfo();
            info.Verb = "print";
            info.FileName = fileName;
            info.CreateNoWindow = true;
            info.WindowStyle = ProcessWindowStyle.Hidden;

            Process p = new Process();
            p.StartInfo = info;
            p.Start();

            p.WaitForInputIdle();
            System.Threading.Thread.Sleep(3000);
            if(!p.CloseMainWindow())
                p.Kill();
        }
    }
}
