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
            ForexAnalyzer.Analyze(@"F:\外汇数据源\AUDUSD\AUDUSD.txt", "AUDUSD");
            //File.WriteAllText("res.txt", Convertor.FromObjectToJson(dict), Encoding.UTF8);
            //ForexAnalyzer.ImportToDB(@"AUDUSD.txt", "AUDUSD");
            //ForexAnalyzer.ImportToDB(@"EURUSD.txt", "EURUSD");
            //ForexAnalyzer.ImportToDB(@"GBPUSD.txt", "GBPUSD");
            //ForexAnalyzer.ImportToDB(@"NZDUSD.txt", "NZDUSD");
            //ForexAnalyzer.ImportToDB(@"USDCAD.txt", "USDCAD");
            //ForexAnalyzer.ImportToDB(@"USDCHF.txt", "USDCHF");
            //ForexAnalyzer.ImportToDB(@"USDJPY.txt", "USDJPY");
            //ForexAnalyzer.ImportToDB(@"XAUUSD.txt", "XAUUSD");
            LOGGER.Log("全部结束");
            Console.ReadKey();
        }
    }
}
