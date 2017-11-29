using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI
{
    /// <summary>
    /// API 的摘要说明
    /// </summary>
    public class API : IHttpHandler
    {
        /// <summary>
        /// 服务发现
        /// 服务路由
        /// 对接缓存
        /// </summary>
        /// <param name="context"></param>
        public void ProcessRequest(HttpContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*"); //设置请求来源不受限制
            context.Response.Headers.Add("Access-Control-Allow-Headers", "X-Requested-With");
            context.Response.Headers.Add("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //请求方式
            context.Response.ContentType = "application/json";
            context.Response.Write("Hello World");
        }


        public void Execute(HttpContext context)
        {
            var param = context.Request.Params;
            
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