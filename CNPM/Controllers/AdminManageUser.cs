using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class AdminManageUser : Controller
    {
        SqlConnection conn;

        public AdminManageUser()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
        }

        public IActionResult Index()
        {
            return View("/Views/Admin/manage-user.cshtml");
        }

        public JsonResult ShowUser()
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("select [name], [user_id], faculty, status, pageLeft from [User]", conn);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> names = new List<string>();
            List<string> userIDs = new List<string>();
            List<string> faculties = new List<string>();
            List<string> status = new List<string>();
            List<string> pagesLeft = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    names.Add(dr.GetString(0));
                    userIDs.Add(dr.GetString(1));
                    faculties.Add(dr.GetString(2));
                    status.Add(dr.GetString(3));
                    pagesLeft.Add(dr.GetInt32(4).ToString());
                }
            }

            conn.Close();

            return new JsonResult
            (
                new 
                { 
                    number = num, 
                    name = names, 
                    userID = userIDs, 
                    faculty = faculties,
                    status = status,
                    pageLeft = pagesLeft
                }
            );
        }

        public void ChangeUserState(string userID, string newState)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "UPDATE [dbo].[User] " +
                "SET status = @status " +
                "WHERE user_id = @userID"
                , conn
            );

            cmd.Parameters.AddWithValue("@status", newState);
            cmd.Parameters.AddWithValue("@userID", userID);

            cmd.ExecuteNonQuery();

            conn.Close();
        }
    }
}
