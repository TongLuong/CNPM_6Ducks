using CNPM.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class AdminManageSystem : Controller
    {
        SqlConnection conn;

        public AdminManageSystem()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-system.cshtml");
        }

        [HttpPost]
        public void SaveSystem(int defNoPage, int timeReset, int price, int maxPrint, string fileTypes)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "dbo.change_system_setting",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@default_no_pages", defNoPage);
            cmd.Parameters.AddWithValue("@resetdate", timeReset);
            cmd.Parameters.AddWithValue("@max_print_per", maxPrint);
            cmd.Parameters.AddWithValue("@page_price", price);

            cmd.ExecuteNonQuery();
            //------------------------------------
            cmd = new SqlCommand("delete from file_type", conn);
            cmd.CommandType = CommandType.Text;
            cmd.ExecuteNonQuery();

            cmd = new SqlCommand
            (
                "dbo.insert_file_type",
                conn
            );
            if (fileTypes == string.Empty || !fileTypes.Contains('.'))
            {
                conn.Close();
                return;
            }
            if (fileTypes.Contains('.'))
            {
                string[] fileType = fileTypes.Split(',');
                foreach (string type in fileType)
                {
                    string ft = string.Join("", type.Split(' '));
                    cmd.Parameters.AddWithValue("@type", ft);
                    cmd.ExecuteNonQuery();
                }
            }
            else
            {
                string type = string.Join("", fileTypes.Split(' '));
                cmd.Parameters.AddWithValue("@type", type);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }
    }
}
