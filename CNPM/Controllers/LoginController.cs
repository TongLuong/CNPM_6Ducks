using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
