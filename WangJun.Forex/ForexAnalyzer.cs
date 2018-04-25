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
        public static Dictionary<string,float> AnalyzeXAUUSD()
        {
            string path =@"F:\外汇数据源\黄金\XAUUSD1小时.csv";
            var srcArray = ForexAnalyzer.PrepareData(path);
            var temp = new Dictionary<string, int>();
            var res = new Dictionary<string, float>();
            var totalCount = srcArray.Length;
            for (int k = 0; k < srcArray.Length - 5; k++)
            {
                LOGGER.Log(string.Format("正在处理 {0}", srcArray[k]));
                var item0 = srcArray[k];
                var item1 = srcArray[k + 1];
                var item2 = srcArray[k + 2];
                var item3 = srcArray[k + 3];
                var item4 = srcArray[k + 4];
                var item5 = srcArray[k + 5];

                if(item0.Close<=item5.Close) ///上涨趋势
                {
                    LOGGER.Log(string.Format("查找到 {0}", srcArray[k]));
                    if (!temp.ContainsKey(item1.HLPercent))
                    {
                        temp[item1.HLPercent] = 0;
                    }

                    if (!temp.ContainsKey(item2.HLPercent))
                    {
                        temp[item2.HLPercent] = 0;
                    }
                    if (!temp.ContainsKey(item3.HLPercent))
                    {
                        temp[item3.HLPercent] = 0;
                    }
                    if (!temp.ContainsKey(item4.HLPercent))
                    {
                        temp[item4.HLPercent] = 0;
                    }

                    temp[item1.HLPercent] = temp[item1.HLPercent]+1;
                    temp[item2.HLPercent] = temp[item2.HLPercent] + 1;
                    temp[item3.HLPercent] = temp[item3.HLPercent]+ 1;
                    temp[item4.HLPercent] = temp[item4.HLPercent]+ 1;
                }


            }

            foreach (var tempItem in temp)
            {
                LOGGER.Log(string.Format("正在合并计算 {0}", tempItem.Key));
                if (!res.ContainsKey(tempItem.Key))
                {
                    res[tempItem.Key] = 0.0f;
                }
                res[tempItem.Key] = tempItem.Value / (1.0f*totalCount);
            }
            return res.OrderByDescending(p => p.Value).ToDictionary(p => p.Key, p => p.Value);
        }
         

        public static ForexItem[] PrepareData(string path)
        {
            LOGGER.Log(string.Format("开始读取历史数据 {0}", path));

            var lines = File.ReadAllLines(path);
            var array = new ForexItem[lines.Length];
            LOGGER.Log(string.Format("历史数据 {0}", lines.Length));

            for (var k=0;k<lines.Length;k++)
            {
                var line = lines[k];
                LOGGER.Log(string.Format("正在转换 {0}", line));
                string[] itemArray = line.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
                var item = ForexItem.Parse(name: "XAUUSD", open: itemArray[2], high: itemArray[3], low: itemArray[4], close: itemArray[5], date: itemArray[0], time: itemArray[1]);
                array[k] = item;
            }
            return array.OrderBy(p=>p.Time).ToArray();
        }
    }
}
