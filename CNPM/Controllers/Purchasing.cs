using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class Purchasing : Controller
    {
        SqlConnection conn;

        public Purchasing()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public JsonResult ShowBuyPageLog(string userID)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            SqlCommand cmd = new SqlCommand("SELECT * FROM dbo.display_buy_page(@userID)", conn);

            cmd.Parameters.AddWithValue("@userID", userID);

            SqlDataReader dr = cmd.ExecuteReader();
            int num = 0;
            List<string> transactionCodes = new List<string>();
            List<string> times = new List<string>();
            List<string> numberOfPages = new List<string>();
            List<string> prices = new List<string>();

            if (dr.HasRows)
            {
                while (dr.Read())
                {
                    num++;
                    transactionCodes.Add(dr.GetString(0).ToString());
                    times.Add(dr.GetString(1).ToString());
                    numberOfPages.Add(dr.GetInt32(2).ToString());
                    prices.Add(dr.GetInt32(3).ToString());
                }
            }

            conn.Close();

            return new JsonResult
            (
                new { number = num, transactionCode = transactionCodes, time = times, numberOfPage = numberOfPages, price = prices }
            );

        }
    }
}
