using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class Login : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
