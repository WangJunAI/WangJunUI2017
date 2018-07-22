using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace WangJun.Config
{
    /// <summary>
    /// 数据域配置信息
    /// </summary>
    public class YunConfig
    {
        public Dictionary<string, string> Load(string keyName)
        {

            Dictionary<string, Dictionary<string, string>> dict = new Dictionary<string, Dictionary<string, string>>();
            dict["阿里云按量计费"] = new Dictionary<string, string>();
            dict["ubuntu开发环境"] = new Dictionary<string, string>();
            dict["docker开发环境"] = new Dictionary<string, string>();
            dict["Windows开发环境"] = new Dictionary<string, string>();


            dict["阿里云按量计费"]["mongodb"] = "mongodb://101.200.49.75:27017";
            dict["阿里云按量计费"]["sqlserver"] = "Data Source=qds165298153.my3w.com;Initial Catalog=qds165298153_db;Persist Security Info=True;User ID=qds165298153;Password=75737573";


            dict["ubuntu开发环境"]["mongodb"] = "mongodb://192.168.0.170:27017";
            dict["ubuntu开发环境"]["sqlserver"] = "Data Source=qds165298153.my3w.com;Initial Catalog=qds165298153_db;Persist Security Info=True;User ID=qds165298153;Password=75737573";

            dict["Windows开发环境"]["mongodb"] = "mongodb://192.168.0.150:27017";
            dict["Windows开发环境"]["sqlserver"] = "Data Source=qds165298153.my3w.com;Initial Catalog=qds165298153_db;Persist Security Info=True;User ID=qds165298153;Password=75737573";

            dict["百度云"]["mongodb"] = "mongodb://106.12.24.68:27017";
            dict["百度云"]["sqlserver"] = "Data Source=qds165298153.my3w.com;Initial Catalog=qds165298153_db;Persist Security Info=True;User ID=qds165298153;Password=75737573";


            if (dict.ContainsKey(keyName))
            {
                return dict[keyName];
            }
            return new Dictionary<string, string>();
            
        }

        public static string CurrentGroupID
        {
            get
            {
                if((null == HttpContext.Current || null == HttpContext.Current.Server) && File.Exists("YunConfig.txt"))
                {
                    return File.ReadAllText("YunConfig.txt");
                }
                else if(null!= HttpContext.Current&&null != HttpContext.Current.Server && File.Exists(HttpContext.Current.Server.MapPath("~") + "YunConfig.txt"))
                {
                    return File.ReadAllText(HttpContext.Current.Server.MapPath("~") + "YunConfig.txt");
                }
                return "阿里云按量计费";
            }
        }




    }
}
