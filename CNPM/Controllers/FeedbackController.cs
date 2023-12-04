using Microsoft.AspNetCore.Mvc;

namespace CNPM.Controllers
{
    public class FeedbackController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
