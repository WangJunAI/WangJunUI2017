using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Forex
{
    public class ForexItem
    {
        public static ForexItem[] ExampleArray { get; set; }

        public float Open { get; set; }

        public float Close { get; set; }

        public float High { get; set; }

        public float Low { get; set; }

        public string Name { get; set; }

        public string Tag1 { get; set; }

        public long Tag2
        {
            get
            {
                return Convertor.DateTimeToLong(this.TradingTime);
            }
        }

        public int IndexOfArray { get; set; }

        /// <summary>
        /// 均值
        /// </summary>
        public Dictionary<string, float> MeanValue { get; set; }

        

        /// <summary>
        /// Summary 根据均值计算不同周期上涨的表现和统计,所在位置
        /// </summary>
        public Dictionary<string, object> Summary { get; set; }

        /// <summary>
        /// 最高价和最低价的长度
        /// </summary>
        public float HLLength
        {
            get
            {
                return Math.Abs(this.High - this.Low);
            }
        }

        /// <summary>
        /// 开盘价和收盘价的长度
        /// </summary>
        public float OCLength
        {
            get
            {
                return Math.Abs(this.Close - this.Open);
            }
        }

        /// <summary>
        /// 上影线长度
        /// </summary>
        public float UpperWickLength
        {
            get
            {
                return (1 ==this.IsRed) ? (this.High - this.Close) : (this.High - this.Open);
            }
        }

        /// <summary>
        /// 下影线长度
        /// </summary>
        public float LowerWickLength
        {
            get
            {
                return (1 == this.IsRed) ? (this.Open - this.Low) : (this.Close - this.Low);
            }
        }

        /// <summary>
        /// 当天是否上涨
        /// </summary>
        public int IsRed
        {
            get
            {
                return (this.Open <= this.Close) ? 1 : -1;
            }
        }



        /// <summary>
        /// 实体所占最高最低比例
        /// </summary>
        public string OC_HLPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.OCLength / this.HLLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 上影线所占全部比例
        /// Upper Wick
        /// </summary>
        public string UW_HLPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.UpperWickLength / this.HLLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 下影线所占全部比例
        /// Lower  Wick
        /// </summary>
        public string LW_HLPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.LowerWickLength / this.HLLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 上下影线比例
        /// Lower  Wick
        /// </summary>
        public string UWDWPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.UpperWickLength / this.LowerWickLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 上影线和实体比例
        /// Upper  Wick
        /// </summary>
        public string UWOCPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.UpperWickLength / this.OCLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 下影线和实体比例
        /// Lower  Wick
        /// </summary>
        public string LWOCPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed * (this.LowerWickLength / this.OCLength);
                var str = string.Format("{0:0}0%", val * 10);
                return str;
            }
        }

        /// <summary>
        /// 交易时间
        /// </summary>
        public DateTime TradingTime { get; set; }

        /// <summary>
        /// 将文本转换为对象
        /// </summary>
        /// <param name="name"></param>
        /// <param name="open"></param>
        /// <param name="close"></param>
        /// <param name="high"></param>
        /// <param name="low"></param>
        /// <param name="date"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        public static ForexItem Parse(string name, string open, string close, string high, string low, string date, string time,int IndexOfArray)
        {
            var inst = new ForexItem();
            inst.Name = name;
            inst.Open = float.Parse(open);
            inst.Close = float.Parse(close);
            inst.Low = float.Parse(low);
            inst.High = float.Parse(high);
            inst.TradingTime = DateTime.Parse(string.Format("{0} {1}", date, time));
            inst.IndexOfArray = IndexOfArray;
            inst.MeanValue = new Dictionary<string, float>();
            ///计算均值
            ///计算当前所在位置
            return inst;
        }

        public static ForexItem CreateNew(string name, float open, float close, float high, float low, DateTime tradingDate,string tag1 )
        {
            var inst = new ForexItem();
            inst.Name = name;
            inst.Open = open;
            inst.Close = close;
            inst.Low =low;
            inst.High = high;
            inst.TradingTime = tradingDate;
            inst.MeanValue = new Dictionary<string, float>();
            inst.Tag1 = tag1;
            return inst;
        }

        /// <summary>
        /// 计算均值
        /// </summary>
        /// <param name="hour"></param>
        public void CalMeanValue(int hours=0,int minutes=0,int day=0)
        {
            if (0 < hours && minutes == 0)
            {
                minutes = 60 * hours;
            }
            if (0 < minutes)
            {
                var stopTime = this.TradingTime.AddMinutes(-1 * minutes);
                var listHour = new List<ForexItem> { this };
                var currentTime = this.TradingTime;
                while (stopTime < currentTime)
                {
                    currentTime = currentTime.AddMinutes(-1);
                    var timeTick = Convertor.DateTimeToLong(currentTime);
                    if (ForexAnalyzer.SrcDict.ContainsKey(timeTick))
                    {
                        var item = ForexAnalyzer.SrcDict[timeTick];
                        listHour.Add(item);
                        LOGGER.Log("计算均值");
                    }
                }

                var openMeanValue = listHour.Sum(p => p.Open) / listHour.Count();///开盘价均值
                var closeMeanValue = listHour.Sum(p => p.Close) / listHour.Count();///收盘价均值
                var highMeanValue = listHour.Sum(p => p.High) / listHour.Count();///最高价均值
                var lowMeanValue = listHour.Sum(p => p.Low) / listHour.Count();///收盘价均值

                this.MeanValue.Remove(string.Format("开盘价均值{0}分钟", minutes));
                this.MeanValue.Add(string.Format("开盘价均值{0}分钟", minutes), openMeanValue);
                this.MeanValue.Remove(string.Format("开盘价和{0}分钟均值相差", minutes));
                this.MeanValue.Add(string.Format("开盘价和{0}分钟均值相差", minutes), this.Open-openMeanValue);

                this.MeanValue.Remove(string.Format("收盘价均值{0}分钟", minutes));
                this.MeanValue.Add(string.Format("收盘价均值{0}分钟", minutes), closeMeanValue);
                this.MeanValue.Remove(string.Format("收盘价和{0}分钟均值相差", minutes));
                this.MeanValue.Add(string.Format("收盘价和{0}分钟均值相差", minutes), this.Close - closeMeanValue);


                this.MeanValue.Remove(string.Format("最高价均值{0}分钟", minutes));
                this.MeanValue.Add(string.Format("最高价均值{0}分钟", minutes), highMeanValue);
                this.MeanValue.Remove(string.Format("最高价和{0}分钟均值相差", minutes));
                this.MeanValue.Add(string.Format("最高价和{0}分钟均值相差", minutes), this.High - highMeanValue);

                this.MeanValue.Remove(string.Format("最低价均值{0}分钟", minutes));
                this.MeanValue.Add(string.Format("最低价均值{0}分钟", minutes), lowMeanValue);
                this.MeanValue.Remove(string.Format("最低价和{0}分钟均值相差", minutes));
                this.MeanValue.Add(string.Format("最低价和{0}分钟均值相差", minutes), this.Low - lowMeanValue);

                ForexItem.CreateNew(this.Name, openMeanValue, closeMeanValue, highMeanValue, lowMeanValue, this.TradingTime.AddMinutes(-1 * minutes / 2), string.Format("均值{0}分钟", minutes)).Save("ForexAnalysis");
            }
        }
 

        /// <summary>
        /// 计算前若干个分钟的走势
        /// </summary>
        /// <param name="prevTickCount"></param>
        public void CalPrevTrend(int prevTickCount=30)
        {

        }
         

        public void Save(string dbName= "ForexService")
        {
            var db = DataStorage.GetInstance(DBType.MongoDB);
            db.Save3(dbName, this.Name, this);
        }


    }
}
