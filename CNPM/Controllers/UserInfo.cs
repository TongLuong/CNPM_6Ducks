using CNPM.Models.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Xml.Linq;

namespace CNPM.Controllers
{
    public class UserInfo : Controller
    {
        SqlConnection conn;
        public UserInfo()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        [HttpPost]
        public JsonResult SaveUserInfo(string user_id, string name, string dob, 
            string sex, string hometown, string addr, string email, 
            string phone_number, string faculty, string enrolled_year, 
            string graduate_year, string pwd)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "dbo.change_user_info",
                conn
            );

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@user_id", user_id);
            cmd.Parameters.AddWithValue("@name", name);
            cmd.Parameters.AddWithValue("@dob", dob);
            cmd.Parameters.AddWithValue("@sex", sex);
            cmd.Parameters.AddWithValue("@hometown", hometown);
            cmd.Parameters.AddWithValue("@addr", addr);
            cmd.Parameters.AddWithValue("@email", email);
            cmd.Parameters.AddWithValue("@phone_number", phone_number);
            cmd.Parameters.AddWithValue("@faculty", faculty);
            cmd.Parameters.AddWithValue("@enrolled_year", enrolled_year);
            cmd.Parameters.AddWithValue("@graduate_year", graduate_year);
            cmd.Parameters.AddWithValue("@pwd", pwd);

            try
            { 
                cmd.ExecuteNonQuery(); 
            }
            catch(Exception ex)
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

        public JsonResult ShowUserInfo(string user_id)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand
            (
                "SELECT * FROM dbo.[User] u, dbo.[Transaction_info] t " +
                "WHERE u.user_id = @user_id " +
                "AND u.user_id = t.user_id"
                , conn
            );

            cmd.Parameters.AddWithValue("@user_id", user_id);

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
                            if (i == 3) // dob
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
                    user_id = temp[0],
                    user_type = temp[1],
                    name = temp[2],
                    dob = temp[3],
                    sex = temp[4],
                    hometown = temp[5],
                    addr = temp[6],
                    email = temp[7],
                    phone_number = temp[8],
                    faculty = temp[9],
                    enrolled_year = temp[10],
                    graduate_year = temp[11],
                    pwd = temp[12],
                    status = temp[13],
                    transaction_id = temp[14],
                    pageLeft = temp[15],
                    bank_name = temp[18]
                }
            );
        }
    }
}
