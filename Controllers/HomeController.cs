using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Diagnostics;
using System;

namespace TechTest.Controllers
{
    public class HomeController : Controller
    {
        static string realvcode = "";
        public ActionResult Index()
        { return View(); }
        [Route("Home/SendVCode")]
        [HttpPost]
        public ActionResult SendVCode(string email)
        {
            SmtpClient MailClient = new SmtpClient()
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                UseDefaultCredentials = false,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new System.Net.NetworkCredential("crg850904@gmail.com", "cqzz2014")
            };
            //generate 4 digital Vcode.
            Random ran = new Random();
            realvcode = "";
            realvcode = ran.Next(0, 10).ToString();
            realvcode = realvcode + ran.Next(0, 10).ToString();
            realvcode = realvcode + ran.Next(0, 10).ToString();
            realvcode = realvcode + ran.Next(0, 10).ToString();
            //second arg is recipient
            MailMessage Mail = new MailMessage(new MailAddress("crg850904@gmail.com"), new MailAddress(email))
            {
                Body = "Your Verification Code is: " + realvcode.ToString(),
                Subject = "Verification Code"
            };
            try { MailClient.Send(Mail); }
            catch (Exception ex) { return Content(ex.ToString()); }
            //do not return realVcode to frondend for security reason.
            return Content("True");
        }
        [Route("Home/Submit")]
        [HttpPost]
        public ActionResult Submit(string name, string phone, string email, string vcode)
        {
            if (realvcode == vcode && realvcode != "")
            {
                realvcode = "";//reset vcode
                //then post to database...
                name = "";
                phone = "";
                email = "";
                return Content("True");
            }
            else
            { return Content("False"); }
        }
    }
}