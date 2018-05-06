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
        public static Dictionary<long, ForexItem> SrcDict = new Dictionary<long, ForexItem>();



        public static Dictionary<string, object> Analyze(string path,string name)
        {
            var res = new Dictionary<string, object>();
            ForexAnalyzer.PrepareData(name, path);
            var startDate = Convertor.DateTimeToLong(new DateTime(2018, 3, 15));
            var stopDate = Convertor.DateTimeToLong(new DateTime(2018, 3, 30));
            for (long k = startDate; k <= stopDate; k++)
            {
                if (SrcDict.ContainsKey(k))
                {
                    SrcDict[k].CalMeanValue(1);
                    res.Add(k.ToString(), SrcDict[k]);
                }
            }


            return res;
        }

        public static void ImportToDB(string path, string name)
        {
            ForexAnalyzer.PrepareData(name, path);
            var startDate = Convertor.DateTimeToLong(new DateTime(2001, 1, 2));
            var stopDate = Convertor.DateTimeToLong(new DateTime(2018, 4, 30));
            for (long k = startDate; k <= stopDate; k++)
            {
                if (SrcDict.ContainsKey(k))
                {
                    SrcDict[k].Save();
                    LOGGER.Log(string.Format("正在导入{0}", k));
                }
            }
           
        }




        /// <summary>
        /// 准备数据
        /// </summary>
        /// <param name="name"></param>
        /// <param name="path"></param>
        /// <param name="source"></param>

        public static void PrepareData(string name,string path)
        {
            LOGGER.Log(string.Format("开始读取历史数据 {0}", path));

            var lines = File.ReadAllLines(path); 
            LOGGER.Log(string.Format("历史数据 {0}", lines.Length));
            
            for (var k =100*10000; k < lines.Length; k++)
            {
                var line = lines[k];
                LOGGER.Log(string.Format("正在转换 {0}", line));
                string[] itemArray = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries); ;
 
               var item= ForexItem.Parse(name: name, open: itemArray[3], high: itemArray[4], low: itemArray[5], close: itemArray[6]
                    , date:string.Format("{0}-{1}-{2}",itemArray[1].Substring(0,4), itemArray[1].Substring(4, 2), itemArray[1].Substring(6, 2)), time:string.Format("{0}:{1}", itemArray[2].Substring(0, 2), itemArray[2].Substring(2, 2))
                    , IndexOfArray: k-1);

                ForexAnalyzer.SrcDict.Add(Convertor.DateTimeToLong(item.TradingTime), item);
            }
  
        }
         
    }
}
