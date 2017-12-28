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
            this.Execute(context);
        }


        public void Execute(HttpContext context)
        {
            if(0 == context.Request.Form.Count) ///Get方式调用
            {
                var classFullName = context.Request.QueryString["c"];
                var methodName = context.Request.QueryString["m"];
                var paramString = context.Request.QueryString["p"];// Convertor.DecodeBase64(context.Request.QueryString["p"]);
                 
                var target = this.GetTargetObject(classFullName, methodName);
                var param = (!string.IsNullOrWhiteSpace(paramString)) ? new object[] { paramString } : new object[] { };
                var method = target.GetType().GetMethod(methodName);
                var res1 = method.Invoke(target, param);
                if(res1 is string)
                {
                    context.Response.ContentType = "text/html";
                    context.Response.Write(res1);
                }
                else if(res1 is object)
                {
                    context.Response.ContentType = "application/json";
                var json = Convertor.FromObjectToJson(res1);
                context.Response.Write(json);   
                }

            }
            else
            {
                //var param =Convertor.FromJsonToDict2(context.Request.Form[0]);
            }

        }
        protected object GetTargetObject(string classFullName,string methodName)
        {
            var dict = new Dictionary<string, string>();
            dict.Add("WangJun.Stock.StockAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.Stock.dll"));
            dict.Add("WangJun.Stock.DataSourceSINA." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.Stock.dll"));
            dict.Add("WangJun.NetLoader.So360." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.NetLoader.dll"));
            dict.Add("WangJun.DB.YunConfig." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.DB.dll"));
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