using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;

namespace CNPM.Controllers
{
    public class AdminInfo : Controller
    {
        SqlConnection conn;
        public AdminInfo()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public IActionResult Index()
        {
            return View("/Views/Admin/admin-information.cshtml");
        }

        public JsonResult LoadAdminInfo(string adminID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM [dbo].[Admin] " +
                "WHERE admin_id = @adminID "
                , conn
            );

            cmd.Parameters.AddWithValue("@adminID", adminID);

            SqlDataReader dr = cmd.ExecuteReader();
            string[] temp = new string[dr.FieldCount];
            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        if (!dr.IsDBNull(i))
                        {
                            if (i == 4 || i == 6) // time_create
                                temp[i] = ((DateTime)dr.GetValue(i)).ToString("yyyy-MM-dd") ?? "";
                            else
                                temp[i] = dr.GetValue(i).ToString() ?? "";
                        }
                        else
                            temp[i] = "";
                    }
                }
            }
            conn.Close();

            return new JsonResult
            (
                new
                {
                    admin_id = temp[0],
                    name = temp[1],
                    email = temp[2],
                    phone_number = temp[3],
                    time_create = temp[4],
                    pwd = temp[5],
                    bdate = temp[6],
                    sex = temp[7],
                    hometown = temp[8],
                    addr = temp[9]
                }
            );
        }

        [HttpPost]
        public JsonResult SaveAdminInfo(string admin_id, string name, string bdate,
            string sex, string hometown, string addr, string email,
            string phone_number, string pwd)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "dbo.change_admin_info",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@admin_id", admin_id);
            cmd.Parameters.AddWithValue("@name", name);
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@phone_number", phone_number);
            cmd.Parameters.AddWithValue("@pwd", pwd);
            cmd.Parameters.AddWithValue("@bdate", bdate);
            cmd.Parameters.AddWithValue("@sex", sex);
            cmd.Parameters.AddWithValue("@hometown", hometown);
            cmd.Parameters.AddWithValue("@addr", addr);

            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                conn.Close();
                return new JsonResult
                (
                    new
                    {
                        result = false,
                        msg = ex.ToString()
                    }
                );
            }

            conn.Close();
            return new JsonResult
            (
                new
                {
                    result = true,
                    msg = ""
                }
            );
        }
    }
}
