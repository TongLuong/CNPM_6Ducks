using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;

namespace CNPM.Controllers
{
    public class ManagePrinter : Controller
    {
        SqlConnection conn;

        public ManagePrinter()
        {
            //conn = new SqlConnection(connectionString);
            conn = new SqlConnection(ConnectionString.sqlConnectionString);
        }

        public JsonResult DisplayPrinters(int n)
        {
            if (conn.State == ConnectionState.Closed)
                conn.Open();

            List<JsonResult> result = new List<JsonResult>();
            SqlCommand cmd = new SqlCommand
            (
                "SELECT " +
                "printer_id, name, building, floor, currentState, " +
                "pagesLeft, inkLeft " +
                "FROM Printer "
                , conn
            );

            SqlDataReader dr = cmd.ExecuteReader();
            string[] temp = new string[dr.FieldCount];
            if (dr.HasRows)
            {
                while (dr.Read() && n > 0)
                {
                    for (int i = 0; i < dr.FieldCount; i++)
                    {
                        if (!dr.IsDBNull(i))
                            temp[i] = dr.GetValue(i).ToString() ?? "";
                        else
                            temp[i] = "";
                    }
                    result.Add
                    (
                        new JsonResult
                        (
                            new
                            {
                                printer_id = temp[0],
                                name = temp[1],
                                building = temp[2],
                                floor = temp[3],
                                currentState = temp[4],
                                pagesLeft = temp[5],
                                inkLeft = temp[6]
                            }
                        )
                    );
                    n--;
                }
            }
            conn.Close();

            return new JsonResult
            (
                new { data = result }
            );
        }
    }
}
