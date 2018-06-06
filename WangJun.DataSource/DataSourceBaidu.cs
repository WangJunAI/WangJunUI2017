using System;
using System.Collections;
using System.Collections.Generic;
using WangJun.Net;
using WangJun.Utility;

namespace WangJun.Tools
{
    public class DataSourceBaidu
    {
        public static DataSourceBaidu GetInstance()
        {
            var inst = new DataSourceBaidu();
            return inst;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="keyword"></param>
        /// <example>https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=骆驼管家告诉你投资P2P，分散也要懂策略！&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=骆驼管家告诉你投资P2P，分散也要懂策略！&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=30&rn=30&gsm=1e&1517679346068=</example>
        /// <returns></returns>
        public string GetPic(string keyword,string sizeInfo=null)
        {
            var tick = new TimeSpan(DateTime.Now.Ticks).TotalMilliseconds;
            var url = string.Format("https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord={0}&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word={0}&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=30&rn=30&gsm=1e&{1}=",keyword,tick);
 
            var httpDownloader = new HTTP();
            var json = httpDownloader.GetString(url);

            var data = Convertor.FromJsonToDict2(json);
            var res = data["data"] as ArrayList;
            return (null != res) ? (res[0] as Dictionary<string, object>)["thumbURL"].ToString() : "无";
        }
    }
}
