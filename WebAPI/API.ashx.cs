using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.SessionState;
using WangJun.Utility;

namespace WebAPI
{
    /// <summary>
    /// API 的摘要说明
    /// </summary>
    public class API : IHttpHandler, IRequiresSessionState
    {
        private static Dictionary<string, Assembly> assDict = new Dictionary<string, Assembly>();

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
            var classFullName = context.Request.QueryString["c"];
            var methodName = context.Request.QueryString["m"];
            var httpMethod = context.Request.HttpMethod;
            var res1 = new object();
            var target = this.GetTargetObject(classFullName, methodName);
            var method = target.GetType().GetMethod(methodName);
            var parameters = method.GetParameters();
            var param = new object[] { };
            var decodeParam = new object[1];
            if ("GET" == httpMethod)
            {
                var keys = context.Request.QueryString.AllKeys.Where((p) => { return !String.IsNullOrWhiteSpace(p) && p.StartsWith("p"); });
                param = new object[parameters.Length];
                for (int k = 0; k < keys.Count(); k++)
                {
                    param[k] = context.Request.QueryString["p" + k];
                }
            }
            else if ("POST" == httpMethod)
            {
                if (1 == context.Request.Form.Count)
                {
                    param = Convertor.FromJsonToObject<object[]>(context.Request.Form[0]);
                    if (0 < param.Length)
                    {
                        decodeParam = new object[param.Length - 1];
                        for (int k = 0; k < param.Length - 1; k++)
                        {
                            decodeParam[k] = param[k];
                        }

                        if (param.Length == (parameters.Length + 1))
                        {
                            var dict = param[param.Length - 1] as Dictionary<string, object>;

                            foreach (var item in dict)
                            {
                                decodeParam[int.Parse(item.Key)] = Convertor.DecodeBase64(param[int.Parse(item.Key)].ToString().Replace("加号", "+").Replace("斜杠", "/").Replace("等于", "=").Replace("空格", " "));
                            }
                            param = decodeParam;
                        }
                    }
                }
            }


            #region 调用前记录
            //var log = new LogItem();
            //log.ClassName = classFullName;
            //log.MethodName = methodName;
            //log.HttpMethod = httpMethod;
            //log.FormalParameter = parameters.ToDictionary(k=>k.Name,v=>v.ParameterType.Name);
            //log.ActualParameter = decodeParam;
            //log.StartTime = DateTime.Now;
            #endregion


            res1 = method.Invoke(target, param);

            #region 调用后记录
            //log.EndTime = DateTime.Now;
            //log.TimeCost = log.EndTime - log.StartTime;
            //log.Success = true;
            //log.Save();
            #endregion

            if (res1 is string)
            {
                context.Response.ContentType = "text/html";
                context.Response.Write(res1);
            }
            else if (res1 is object)
            {
                context.Response.ContentType = "application/json";
                var json = Convertor.FromObjectToJson(res1);
                context.Response.Write(json);
            }


        }
        protected object GetTargetObject(string classFullName, string methodName)
        {
            var dict = new Dictionary<string, string>();
            dict.Add("WangJun.Config.YunConfig." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.Config.dll"));
            dict.Add("WangJun.YunDoc.YunDocWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.YunNote.YunNoteWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.YunPan.YunPanWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.YunProject.YunProjectWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.Admin.AdminWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.YunNews.YunNewsWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.YunQun.YunQunWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.Tools.DataSourceBaidu." + methodName, HttpContext.Current.Server.MapPath("./bin/WangJun.DataSource.dll"));
            dict.Add("WangJun.HTML.HTMLItem." + methodName, HttpContext.Current.Server.MapPath("./bin/Html/WangJun.HTML.dll"));
            dict.Add("WangJun.Yun.YunUser." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunUser.dll"));
            dict.Add("WangJun.App.YunUserAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));
            dict.Add("WangJun.Yun.YunAI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunAI/WangJun.YunAI.dll"));
            dict.Add("WangJun.Yun.YunTools." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunBaseBiz.dll"));
            dict.Add("WangJun.Yun.YunForm." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunBaseBiz.dll"));
            dict.Add("WangJun.App.YunWebAPI." + methodName, HttpContext.Current.Server.MapPath("./bin/YunWebAPI/WangJun.YunWebAPI.dll"));


            var dllPath = dict[classFullName + "." + methodName];
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