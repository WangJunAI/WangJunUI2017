using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using WangJun.Data;
using WangJun.Stock;

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
            this.Execute(context);
        }


        public void Execute(HttpContext context)
        {
            //var param =Convertor.FromJsonToDict2(context.Request.Form[0]);
            var classFullName = context.Request.QueryString["c"];
            var methodName = context.Request.QueryString["m"];
            //var dllPath = context.Server.MapPath("./bin/WangJun.Stock.dll");
            //Assembly ass = Assembly.LoadFrom(dllPath);
            //var obj = ass.CreateInstance("WangJun.Stock.StockAPI");
            var target = this.GetTargetObject(classFullName, methodName);
            var param = new object[] { };
            var method = target.GetType().GetMethod(methodName);
            var res1 = method.Invoke(target, param);

            var json = Convertor.FromObjectToJson(res1);
            context.Response.Write(json);
        }
        protected object GetTargetObject(string classFullName,string methodName)
        {
            var dict = new Dictionary<string, string>();
            dict.Add("WangJun.Stock.StockAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.Stock.dll"));
            dict.Add("WangJun.NetLoader.So360." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.NetLoader.dll"));
            var dllPath = dict[classFullName+"." + methodName];
            Assembly ass = Assembly.LoadFrom(dllPath);
            var obj = ass.CreateInstance(classFullName);
            return obj;

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