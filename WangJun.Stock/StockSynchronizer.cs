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
                    try
                    {
                        var stockName = this.stockCodeDict[stockCode];
                        if (!(date.DayOfWeek == DayOfWeek.Sunday || date.DayOfWeek == DayOfWeek.Saturday))
                        {
                            DataSourceSINA.GetInstance().DownloadExcel(date, stockCode, stockName);

                            LOGGER.Log(string.Format("{0}{1}{2}", stockCode, stockName, date));
                        }
                    }
                    catch(Exception e)
                    {
                        LOGGER.Log(e.Message);
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
                var lines = File.ReadAllLines(filePath, Encoding.Default);
                for (var k = 1; k < lines.Length; k++)
                {
                    var line = lines[k];
                    var fileNameLength = fileName.Length;
                    var stockCode = fileName.Substring(0, 6);
                    var dateString = fileName.Substring(fileName.Length - 8, 8).Insert(4, "-").Insert(7, "-");
                    var arr = line.Split(new char[] { '\t' }, StringSplitOptions.RemoveEmptyEntries);
                    if (6 == arr.Length && lines[0].Contains("成交时间"))
                    {
                        var tradingTime = DateTime.Parse(dateString + " " + arr[0]);
                        var price = float.Parse(arr[1]);
                        var priceChange = arr[2];
                        var volume = int.Parse(arr[3]) * 100;
                        var turnover = float.Parse(arr[4]);
                        var kind = arr[5];
                        LOGGER.Log(string.Format("{0}{1}{2}{3}{4}{5}", tradingTime, price, priceChange, volume, turnover, kind));
                    }


                    LOGGER.Log(line);
                }

            }
        }



        #region 更新页面
        public void UpdateHtml()
        {
            var stockCodeQueue = this.PrepareData();
            var sina = DataSourceSINA.GetInstance();
            while (CONST.IsSafeUpdateTime(3) && 0 < stockCodeQueue.Count) ///这里还要检查安全性
            {
                var stockCode = stockCodeQueue.Dequeue();
                try
                {
                    if (!HTMLItem.IsExsit(stockCode, "公司简介"))
                    {
                        HTMLItem.CreateNew(sina.GetGSJJ(stockCode), stockCode, "公司简介").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "板块概念"))
                    {
                        HTMLItem.CreateNew(sina.GetBKGN(stockCode), stockCode, "板块概念").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "财务摘要"))
                    {
                        HTMLItem.CreateNew(sina.GetCWZY(stockCode), stockCode, "财务摘要").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "融资融券"))
                    {
                        HTMLItem.CreateNew(sina.GetRZRQ(stockCode), stockCode, "融资融券").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "财务指标"))
                    {
                        HTMLItem.CreateNew(sina.GetCWZB(stockCode), stockCode, "财务指标").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "大宗交易"))
                    {
                        HTMLItem.CreateNew(sina.GetDZJY(stockCode), stockCode, "大宗交易").Save();
                    }

                    if (!HTMLItem.IsExsit(stockCode, "内部交易"))
                    {
                        HTMLItem.CreateNew(sina.GetNBJY(stockCode), stockCode, "内部交易").Save();
                    }

                    sina.DownloadBalanceSheet(stockCode, this.stockCodeDict[stockCode]); ThreadManager.Pause(seconds: 1);

                    sina.DownloadCashFlow(stockCode, this.stockCodeDict[stockCode]); ThreadManager.Pause(seconds: 1);

                    sina.DownloadProfitStatement(stockCode, this.stockCodeDict[stockCode]); ThreadManager.Pause(seconds: 1);

                    Console.WriteLine("已处理 {0} 剩余 {1}", stockCode, stockCodeQueue.Count);
                }
                catch (Exception e)
                {

                    LOGGER.Log(e.Message);
                    ThreadManager.Pause(minutes: 1);
                    stockCodeQueue.Enqueue(stockCode);
                }
            }
        }
        #endregion

        #region 获取任务

        #endregion

        #region 完成任务

        #endregion
    }
}
