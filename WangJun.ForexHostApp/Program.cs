using System;
using System.Collections.Generic;
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
            var dict = ForexAnalyzer.AnalyzeXAUUSD();
            LOGGER.Log("全部结束");
            Console.ReadKey();
        }
    }
}
