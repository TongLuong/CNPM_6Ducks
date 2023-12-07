using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminManagePrinter : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-printer.cshtml");
        }
    }
}
