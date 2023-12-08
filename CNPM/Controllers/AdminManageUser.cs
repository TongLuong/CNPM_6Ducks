using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class AdminManageUser : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-user.cshtml");
        }

        SqlConnection conn;

        public AdminManageUser()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public JsonResult ShowUser()
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("select [name], [user_id], faculty, pageLeft from [User]", conn);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> names = new List<string>();
            List<string> userIDs = new List<string>();
            List<string> faculties = new List<string>();
            List<string> pagesLeft = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    names.Add(dr.GetString(0));
                    userIDs.Add(dr.GetString(1));
                    faculties.Add(dr.GetString(2));
                    pagesLeft.Add(dr.GetInt32(3).ToString());
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, name = names, userID = userIDs, faculty = faculties, pageLeft = pagesLeft }
            );

        }
    }
}
