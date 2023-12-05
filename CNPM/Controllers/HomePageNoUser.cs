using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class HomePageNoUser : Controller
    {
        public IActionResult Index()
        {
            return View("/Views/User/HomepageNoUser/index.cshtml");
        }
    }
}
