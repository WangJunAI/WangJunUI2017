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
        public static Dictionary<string,object> AnalyzeXAUUSD(string path)
        { 
            var srcArray = ForexAnalyzer.PrepareData(path);
            var temp = new Dictionary<string, int>();
            var statistics = new Dictionary<string, float>();
            var res = new Dictionary<string, object>();
            var totalCount = srcArray.Length;
            var exampleList = new List<ForexItem>();
            var ocAmplitude = new Dictionary<string, int>();
            for (int k = 0; k < srcArray.Length - 5; k++)
            {
                LOGGER.Log(string.Format("正在处理 {0}", srcArray[k]));
                var item0 = srcArray[k];
                var item1 = srcArray[k + 1];
                var item2 = srcArray[k + 2];
                var item3 = srcArray[k + 3];
                var item4 = srcArray[k + 4];
                var item5 = srcArray[k + 5];

                if(3.0<=(item5.Close-item0.Close)) ///上涨趋势
                {
                    LOGGER.Log(string.Format("查找到 {0}", srcArray[k]));
                    if (!temp.ContainsKey("初始点" + item0.HLPercent))
                    {
                        temp["初始点" + item0.HLPercent] = 0;
                    }

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

                    if (!temp.ContainsKey("结束点" + item5.HLPercent))
                    {
                        temp["结束点" + item5.HLPercent] = 0;
                    }


                    temp["初始点" + item0.HLPercent] += 1;
                    temp[item1.HLPercent] = temp[item1.HLPercent] + 1;
                    temp[item2.HLPercent] = temp[item2.HLPercent] + 1;
                    temp[item3.HLPercent] = temp[item3.HLPercent] + 1;
                    temp[item4.HLPercent] = temp[item4.HLPercent] + 1;
                    temp["结束点"+item5.HLPercent] +=  1;
                    item5.Tag = "结束点" + item5.HLPercent;

                }

                #region 波动幅度统计
                var ocAmplitudeKey = string.Format("{0:00}", (item0.Close - item0.Open) * 100);
                if (!ocAmplitude.ContainsKey(ocAmplitudeKey.ToString()))
                {
                    ocAmplitude[ocAmplitudeKey.ToString()] = 0;
                }
                ocAmplitude[ocAmplitudeKey.ToString()] += 1;

                #endregion
            }

            foreach (var tempItem in temp)
            {
                LOGGER.Log(string.Format("正在合并计算 {0}", tempItem.Key));
                if (!statistics.ContainsKey(tempItem.Key))
                {
                    statistics[tempItem.Key] = 0.0f;
                }
                statistics[tempItem.Key] = tempItem.Value / (1.0f*totalCount);
            }

            statistics= statistics.OrderByDescending(p => p.Value).ToDictionary(p => p.Key, p => p.Value);
            res.Add("统计结果",statistics);

            foreach (var ocAmplitudeItem in ocAmplitude)
            {
                LOGGER.Log(string.Format("正在合并计算 {0}", ocAmplitudeItem.Key));
                if (!ocAmplitude.ContainsKey(ocAmplitudeItem.Key))
                {
                    statistics["OC振幅分布"+ocAmplitudeItem.Key] = 0.0f;
                }
                statistics["OC振幅分布" + ocAmplitudeItem.Key] = ocAmplitudeItem.Value / (1.0f * totalCount);
            }

            foreach (var item in srcArray)
            {
                if (!string.IsNullOrWhiteSpace(item.Tag))
                {
                    if (!res.ContainsKey(item.Tag))
                    {
                        res.Add(item.Tag, new List<string>());
                    }
                    (res[item.Tag] as List<string>).Add(item.Time.ToString());
                }
            }

            return res;
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
