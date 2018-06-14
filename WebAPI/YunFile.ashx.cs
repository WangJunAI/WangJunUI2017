using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WangJun.DB;

namespace WebAPI
{
    /// <summary>
    /// YunFile 的摘要说明
    /// </summary>
    public class YunFile : IHttpHandler
    {

 

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*"); //设置请求来源不受限制
            context.Response.Headers.Add("Access-Control-Allow-Headers", "X-Requested-With");
            context.Response.Headers.Add("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //请求方式
            this.Execute(context);
        }

        public void Execute(HttpContext context)
        {
            var httpMethod = context.Request.HttpMethod;
            var method = context.Request.QueryString["m"];
            var json = new object();
            if ("POST" == httpMethod && "save" == method.ToLower())
            {
                var file = context.Request.Files[0];

                var db = DataStorage.GetInstance(DBType.MongoDB);
                var id = db.SaveFile(file.InputStream, file.FileName);
                json = new { ID = id };
            }


            context.Response.ContentType = "application/json";
            context.Response.Write(json);


        }
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}