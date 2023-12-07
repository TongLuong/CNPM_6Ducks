using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class AdminManageSystem : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/Admin/manage-system.cshtml");
        }
    }
}
