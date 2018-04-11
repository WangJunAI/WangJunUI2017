using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.AI;
using WangJun.DataSource;
using WangJun.DB;
using WangJun.Net;
using WangJun.NetLoader;
using WangJun.Utility;

namespace WangJun.Stock
{
    /// <summary>
    /// 
    /// </summary>
    public class StockTaskExecutor
    { 
        public static StockTaskExecutor CreateInstance()
        {
            var inst = new StockTaskExecutor();
            return inst;
        }

        #region 更新股票代码信息
        /// <summary>
        /// 更新股票代码信息
        /// </summary>
        public void UpdateAllStockCode()
        {
            var mongo = DataStorage.GetInstance(DBType.MongoDB);
            var dataSource = new Dictionary<string, string>();

            Console.WriteLine("准备从网络获取股票代码");
            dataSource = DataSourceSINA.GetInstance().GetAllStockCode();

            var dbName = CONST.DB.DBName_StockService;
            var collectionName = CONST.DB.CollectionName_StockCode;
            foreach (var srcItem in dataSource)
            {
                var svItem = new { StockCode = srcItem.Key,SortCode = Convert.ToInt32(srcItem.Key), StockName = srcItem.Value, CreateTime = DateTime.Now };
                var filter = "{'StockCode':'" + svItem.StockCode + "'}";
                mongo.Save3(dbName,collectionName,svItem,filter);
            }
            Console.WriteLine("已成功更新今日股票代码");
        }
        #endregion
 

    }
}
