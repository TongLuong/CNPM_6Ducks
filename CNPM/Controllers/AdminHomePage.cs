using CNPM.Models.Domain;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Reflection.PortableExecutable;
using System.Text;
using static System.Net.Mime.MediaTypeNames;

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
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
            Environment = _environment;
            wwwPath = this.Environment.WebRootPath;
        }

        public IActionResult Index()
        {
            ExportReportByYear(wwwPath + "\\AnnualReport.csv",
                DateTime.Now.Year.ToString());

            ExportReportByMonth(wwwPath + "\\MonthlyReport.csv",
                DateTime.Now.Year.ToString());

            return View("/Views/Admin/index.cshtml");
        }

        public void ExportReportByYear(string fileNameByYear,
            string year)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            MemoryStream memory = new MemoryStream();

            // by year
            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM [dbo].[report_by_year](@year)"
                , conn
            );

            cmd.Parameters.AddWithValue("@year", year);

            SqlDataReader dr = cmd.ExecuteReader();
            string[] temp = new string[dr.FieldCount];

            StringBuilder output = new StringBuilder();
            string t = "";
            
            using (StreamWriter writer = new StreamWriter(new FileStream(fileNameByYear,
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
                            t += (i == 0 ? "" : ",") + dr.GetValue(i).ToString() ?? "";
                            newLine.Append(t);
                        }

                        writer.WriteLine(newLine.ToString());
                    }
                } 
            }


            // close connection
            conn.Close();
        }

        public void ExportReportByMonth(string fileNameByMonth,
            string year)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            MemoryStream memory = new MemoryStream();

            // by month
            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM [dbo].[report_by_year_n_month](@year)"
                , conn
            );

            cmd.Parameters.AddWithValue("@year", year);

            SqlDataReader dr = cmd.ExecuteReader();
            string[] temp = new string[dr.FieldCount];

            StringBuilder output = new StringBuilder();
            string t = "";

            using (StreamWriter writer = new StreamWriter(new FileStream(fileNameByMonth,
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
                            t += (i == 0 ? "" : ",") + dr.GetValue(i).ToString() ?? "";
                            newLine.Append(t);
                        }

                        writer.WriteLine(newLine.ToString());
                    }
                }
            }

            // close connection
            conn.Close();
        }
    }
}
