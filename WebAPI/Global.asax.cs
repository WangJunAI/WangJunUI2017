using System;

namespace WebAPI
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
 


            //ChangeItem item = new ChangeItem();
            //var context = HttpContext.Current;
            //item.StartTime = DateTime.Now;
            //item.HttpMethod = context.Request.HttpMethod;
            //item.Url = context.Request.Url.ToString();
            //if (0 < context.Request.Form.Count)
            //{
            //    item.Form = context.Request.Form[0];
            //}
            //item.Save();
        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}