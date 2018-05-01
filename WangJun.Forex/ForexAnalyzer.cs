using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Forex
{
    public static class ForexAnalyzer
    {
        private static ForexItem[] SrcArray { get; set; }

        private static Dictionary<string, ForexItem> IndexSrcDict = new Dictionary<string, ForexItem>();


        public static Dictionary<string, object> AnalyzeXAUUSD(string path)
        {
            var srcArray = ForexAnalyzer.PrepareData("XAUUSD", path,"tester");

            var res = new Dictionary<string, object>();

            res.Add("OC振幅的分布", CalAmplitudeItemdistribution(srcArray));
            res.Add("20日均值计算", CalMeanValue(srcArray, 20));
            res.Add("144日均值计算", CalMeanValue(srcArray, 144));
            res.Add("169日均值计算", CalMeanValue(srcArray, 169));

            return res;
        }

        /// <summary>
        /// 计算振幅分布
        /// </summary>
        /// <param name="srcArray"></param>
        /// <returns></returns>
        public static Dictionary<string, object> CalAmplitudeItemdistribution(ForexItem[] srcArray)
        {
            var res = new Dictionary<string, object>();
            var temp = new Dictionary<string, int>();
            for (int k = 0; k < srcArray.Length - 5; k++)
            {
                var item = srcArray[k];
                LOGGER.Log(string.Format("正在计算振幅 {0}", item.Time));
                var key = string.Format("{0:00}",100 * (item.Close - item.Open));
                if (!temp.ContainsKey(key))
                {
                    temp.Add(key, 0);
                }
                temp[key] += 1;
            }

            temp = temp.OrderByDescending(p => p.Value).ToDictionary(p => p.Key, p => p.Value);

            foreach (var tempItem in temp)
            {
                res.Add("振幅" + tempItem.Key, string.Format("{0:00.00}%", 100.0f * tempItem.Value / srcArray.Length));
            }
            return res;
        }

        /// <summary>
        /// 计算均值
        /// </summary>
        /// <param name="srcArray"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public static Dictionary<string, object> CalMeanValue(ForexItem[] srcArray, int count)
        {
            var res = new Dictionary<string, object>(); 
            for (int k = count; k < srcArray.Length; k++)
            {
                var item = srcArray[k];

                LOGGER.Log(string.Format("正在计算均值 {0}", item.Time));

                var totalClose = 0.0f;
                for (int m = count; 0 < m; m--)
                {
                    totalClose += srcArray[k - m].Close;
                }
                srcArray[k].MeanValueClose = totalClose / count;
            }

 
             return res;
        }
    

        public static ForexItem[] PrepareData(string name,string path,string source, int startIndex=500*10000)
        {
            LOGGER.Log(string.Format("开始读取历史数据 {0}", path));

            var lines = File.ReadAllLines(path);
            var array = new ForexItem[lines.Length];
            LOGGER.Log(string.Format("历史数据 {0}", lines.Length));

            for (var k =startIndex; k < lines.Length; k++)
            {
                var line = lines[k];
                LOGGER.Log(string.Format("正在转换 {0}", line));
                string[] itemArray = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries); ;
                if ("mt4" == source)
                {
                    array[k] = ForexItem.Parse(name: name, open: itemArray[2], high: itemArray[3], low: itemArray[4], close: itemArray[5], date: itemArray[0], time: itemArray[1]);
                }
                else if ("tester" == source&& k!=0)
                {
                    if(null == array[0]) { array[0] = new ForexItem();  }
                    array[k] = ForexItem.Parse(name: name, open: itemArray[3], high: itemArray[4], low: itemArray[5], close: itemArray[6]
                        , date:string.Format("{0}-{1}-{2}",itemArray[1].Substring(0,4), itemArray[1].Substring(4, 2), itemArray[1].Substring(6, 2)), time:string.Format("{0}:{1}", itemArray[2].Substring(0, 2), itemArray[2].Substring(2, 2)));
                }

            }
            return array.OrderBy(p => p.Time).ToArray();
        }
         
    }
}
