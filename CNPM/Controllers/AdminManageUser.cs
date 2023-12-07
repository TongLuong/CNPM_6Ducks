using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminManageUser : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-user.cshtml");
        }
    }
}
