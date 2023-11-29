using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class PurchasingController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
