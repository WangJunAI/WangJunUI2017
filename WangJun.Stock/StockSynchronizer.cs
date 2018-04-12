using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using WangJun.DataSource;
using WangJun.DB;
using WangJun.HTML;
using WangJun.Utility;

namespace WangJun.Stock
{
    /// <summary>
    /// 股市同步器
    /// </summary>
    public class StockSynchronizer
    {
        protected Dictionary<string, string> stockCodeDict = new Dictionary<string, string>();
        protected Dictionary<string, DateTime> syncTimeDict = new Dictionary<string, DateTime>();
        public static StockSynchronizer GetInstance()
        {
            var inst = new StockSynchronizer();
            inst.PrepareData();
            return inst;
        }

        #region 更新股票代码
        /// <summary>
        /// 更新股票代码
        /// </summary>
        public void SyncStockCode()
        {
            var startTime = DateTime.Now;///开始运行时间
            Console.Title = "股票代码更新进程 启动时间：" + startTime;
            var inst = StockTaskExecutor.CreateInstance();
            while (true)
            {
                if (CONST.IsSafeUpdateTime(1)) ///非交易时间,且交易前1小时
                {
                    LOGGER.Log(string.Format("准备更新股票代码 {0}", DateTime.Now));
                    inst.UpdateAllStockCode();
                    LOGGER.Log(string.Format("股票代码更新完毕 {0} {1} 下一次更新在一天后后 已运行 ", DateTime.Now, DateTime.Now - startTime));
                    ThreadManager.Pause(days: 1); ///每日更新一次
                }
                else
                {
                    Console.WriteLine("交易时间或非安全可更新时间 {0}", DateTime.Now);
                    ThreadManager.Pause(hours: 1);

                }

            }
        }
        #endregion

 

        #region 准备数据
        /// <summary>
        /// 准备数据
        /// </summary>
        /// <returns></returns>
        protected Queue<string> PrepareData(string methodName = null)
        {
            var mongo = DataStorage.GetInstance(DBType.MongoDB);
            var query = "{\"SortCode\":{$exists:true}}";
            var sort = "{\"SortCode\":1}";
            var resList = mongo.Find3("StockService", "StockCode", query, sort);

            this.stockCodeDict = resList.ToDictionary(k => k["StockCode"].ToString(), v => v["StockName"].ToString());

            var codeList = from item in resList orderby (int)item["SortCode"] select item["StockCode"].ToString();
            var queue = CollectionTools.ToQueue<string>(codeList);

             return queue;

        }
        #endregion
         

        #region 同步成交明细Excel
        public void SyncExcel()
        {
            var q = this.PrepareData();
            //var date = DateTime.Now;
            for (var date = DateTime.Now.Date.AddDays(-1); new DateTime(2017, 1, 1) < date; date = date.AddDays(-1))
            {
                foreach (var stockCode in q)
                {
                     var stockName = this.stockCodeDict[stockCode];
                    if (!(date.DayOfWeek == DayOfWeek.Sunday || date.DayOfWeek == DayOfWeek.Saturday))
                    {
                        DataSourceSINA.GetInstance().DownloadExcel(date, stockCode, stockName);
                        
                        LOGGER.Log(string.Format("{0}{1}{2}", stockCode, stockName, date));
                    }
                }

            }
        }
        #endregion

        public void ProcHistory()
        {
            var folderPath = @"F:\Excel\";
            var files = Directory.EnumerateFiles(folderPath);
            foreach (var filePath in files)
            {
                var fileName = filePath.Replace(folderPath, string.Empty).Replace(".xls", string.Empty);
                var lines = File.ReadAllLines(filePath,Encoding.Default);
                for (var k=1;k<lines.Length;k++)
                {
                    var line = lines[k];
                    var fileNameLength = fileName.Length;
                    var stockCode = fileName.Substring(0, 6);
                    var dateString = fileName.Substring(fileName.Length - 8, 8).Insert(4, "-").Insert(7, "-");
                    var arr = line.Split(new char[] { '\t' },StringSplitOptions.RemoveEmptyEntries);
                    if(6 == arr.Length && lines[0].Contains("成交时间"))
                    {
                        var tradingTime = DateTime.Parse(dateString + " " + arr[0]);
                        var price = float.Parse(arr[1]);
                        var priceChange = arr[2];
                        var volume = int.Parse(arr[3])*100;
                        var turnover = float.Parse(arr[4]);
                        var kind = arr[5];
                        LOGGER.Log(string.Format("{0}{1}{2}{3}{4}{5}", tradingTime, price, priceChange, volume, turnover, kind));
                    }
                     

                    LOGGER.Log(line);
                }

            }
        }

        #region
        #region SINA融资融券
        /// <summary>
        /// SINA融资融券
        /// </summary>
        public void SyncRZRQ()
        {
            var startTime = DateTime.Now;///开始运行时间
            Console.Title = "SINA融资融券 更新进程 启动时间：" + startTime;

            var exe = StockTaskExecutor.CreateInstance();
            var mongo = DataStorage.GetInstance(DBType.MongoDB);
            var dbName = CONST.DB.DBName_StockService;
            var collectionNameRZRQ = CONST.DB.CollectionName_RZRQ;
            var methodName = "SyncRZRQ";

            while (true)
            {
                var q = this.PrepareData(methodName);

                while (0 < q.Count)
                {
                    var stockCode = q.Dequeue();
                    var stockName = this.stockCodeDict[stockCode];

                    var html = DataSourceSINA.GetInstance().GetRZRQ(stockCode);

                    var item = new HTMLItem();
                    item.Html = html;
                    item.CreateTime = DateTime.Now;
                    item.Save();

                    ThreadManager.Pause(seconds: 5);
                }

                LOGGER.Log(string.Format("本次SINA融资融券更新完毕，下一次一天以后更新 {0}", DateTime.Now)); 
                ThreadManager.Pause(days: 1);
            }
        }
        #endregion
        #endregion

        #region 创建任务
        public void CreateTask()
        {
            var stockCodeQueue = this.PrepareData();
            while(0<stockCodeQueue.Count) ///这里还要检查安全性
            {
                var stockCode = stockCodeQueue.Dequeue();

                //融资融券
                //大宗交易
                //内部交易
                //限售解禁



            }
        }
        #endregion

        #region 获取任务

        #endregion

        #region 完成任务

        #endregion
    }
}
