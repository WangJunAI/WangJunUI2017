﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Stock;

namespace WangJun.StockHostApp
{
    class Program
    {
        static void Main(string[] args)
        {
            StockSynchronizer.GetInstance().UpdateHtml();
            //StockSynchronizer.GetInstance().SyncExcel();

            Console.WriteLine("全部结束");
        }
    }
}
