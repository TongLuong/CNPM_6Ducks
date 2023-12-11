using CNPM.Models.Domain;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace CNPM.Controllers
{
    public class AdminHomePage : Controller
    {
        private SqlConnection conn;
        private string wwwPath;
        private Microsoft.AspNetCore.Hosting.IWebHostEnvironment Environment;

        public AdminHomePage(Microsoft.AspNetCore.Hosting.IWebHostEnvironment _environment)
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
            Environment = _environment;
            wwwPath = this.Environment.WebRootPath;
        }

        public IActionResult Index()
        {
            /*ExportReportByYear(wwwPath + "\\AnnualReport.csv",
                DateTime.Now.Year.ToString());

            ExportReportByMonth(wwwPath + "\\MonthlyReport.csv",
                DateTime.Now.Year.ToString());*/

            return View("/Views/Admin/index.cshtml");
        }

        public JsonResult ExportReportByYear(string fileNameByYear,
            string year)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            string filePath = wwwPath + "\\" + fileNameByYear;

            // by year
            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM [dbo].[report_by_year](@year)"
                , conn
            );

            cmd.Parameters.AddWithValue("@year", year);

            SqlDataReader dr = cmd.ExecuteReader();
            
            using (StreamWriter writer = new StreamWriter(new FileStream(filePath,
                FileMode.Create, FileAccess.Write, FileShare.None), Encoding.UTF8))
            { 
                if (dr.HasRows)
                {
                    IEnumerable<string> header = Enumerable.Range(0,
                        dr.FieldCount).Select(dr.GetName);
                    writer.WriteLine(String.Join(",", header));

                    while (dr.Read())
                    {
                        StringBuilder newLine = new StringBuilder();
                        for (int i = 0; i < dr.FieldCount; i++)
                        {
                            newLine.Append((i == 0 ? "" : ",") + dr.GetValue(i).ToString() ?? "");
                        }

                        writer.WriteLine(newLine.ToString());
                    }
                } 
            }


            // close connection
            //conn.Close();

            /*byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
            return File
            (
                fileBytes,
                System.Net.Mime.MediaTypeNames.Application.Octet,
                fileNameByYear
            );*/

            string baseUrl = string.Format("{0}://{1}",
                       Request.Scheme, Request.Host);

            return new JsonResult
            (
                new { path = baseUrl + "/" + fileNameByYear }
            );
        }

        public JsonResult ExportReportByMonth(string fileNameByMonth,
            string year)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            string fileName = wwwPath + "\\" + fileNameByMonth;

            // by month
            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM [dbo].[report_by_year_n_month](@year)"
                , conn
            );

            cmd.Parameters.AddWithValue("@year", year);

            SqlDataReader dr = cmd.ExecuteReader();

            using (StreamWriter writer = new StreamWriter(new FileStream(fileName,
                FileMode.Create, FileAccess.Write, FileShare.None), Encoding.UTF8))
            {
                if (dr.HasRows)
                {
                    IEnumerable<string> header = Enumerable.Range(0,
                        dr.FieldCount).Select(dr.GetName);
                    writer.WriteLine(String.Join(",", header));

                    while (dr.Read())
                    {
                        StringBuilder newLine = new StringBuilder();
                        for (int i = 0; i < dr.FieldCount; i++)
                        {
                            newLine.Append((i == 0 ? "" : ",") + dr.GetValue(i).ToString() ?? "");
                        }

                        writer.WriteLine(newLine.ToString());
                    }
                }
            }

            // close connection
            //conn.Close();

            string baseUrl = string.Format("{0}://{1}",
                       Request.Scheme, Request.Host);

            return new JsonResult
            (
                new { path = baseUrl + "/" + fileNameByMonth }
            );
        }
    }
}
