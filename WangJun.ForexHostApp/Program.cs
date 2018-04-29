using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Forex;
using WangJun.Utility;

namespace WangJun.ForexHostApp
{
    class Program
    {
        static void Main(string[] args)
        {
            var dict = ForexAnalyzer.AnalyzeXAUUSD(@"F:\外汇数据源\AUDUSD\AUDUSD.txt");
            File.WriteAllText("res.txt",Convertor.FromObjectToJson(dict), Encoding.UTF8);
            LOGGER.Log("全部结束");
            Console.ReadKey();
        }
    }
}
