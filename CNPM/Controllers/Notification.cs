using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class Notification : Controller
    {
        SqlConnection conn;

        public Notification()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["DB_Printing"].ConnectionString);
        }

        public JsonResult ShowNotification(string userID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_notification(@userID)", conn);

            cmd.Parameters.AddWithValue("@userID", userID);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> times = new List<string>();
            List<string> details = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    times.Add(dr.GetDateTime(0).ToString("yyyy'-'MM'-'dd' 'HH':'mm':'ss"));
                    details.Add(dr.GetString(1));
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, time = times, detail = details }
            );

        }
    }
}
