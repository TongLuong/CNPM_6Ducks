using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class Login : Controller
    {
        private SqlConnection conn;

        public Login()
        {
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
            //conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public JsonResult CheckLogin(string username, string password)
        {
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter();
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand func = new SqlCommand("SELECT dbo.check_login(@username, @pwd)",
                conn);

            func.Parameters.AddWithValue("@username", username == null ? DBNull.Value : username);
            func.Parameters.AddWithValue("@pwd", password == null ? DBNull.Value : password);

            string id = (string)func.ExecuteScalar();
            int accType = id == "" ? 
                -1 : (id[0] == '1' ? 0 : 1); // 0: admin, 1: user

            conn.Close();

            return new JsonResult
            (
                new
                { 
                    id = id,
                    type = accType
                }
            );
        }
    }
}
