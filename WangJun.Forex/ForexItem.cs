using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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

        public int IndexOfArray { get; set; }

        /// <summary>
        /// 均值
        /// </summary>
        public Dictionary<string, float> MeanValue { get; set; }



        /// <summary>
        /// 所在位置
        /// </summary>
        public Dictionary<string, float> Position { get; set; }

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


        public void CalMeanValue(int hour=1)
        {
            var hourStopTime = this.TradingTime.AddHours(-1*hour); 
            var listHour = new List<ForexItem> { this};
            var currentTime = this.TradingTime;
            while (hourStopTime<currentTime) {
                currentTime= currentTime.AddMinutes(-1);
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

            this.MeanValue.Remove(string.Format("开盘价均值{0}小时", hour));
            this.MeanValue.Add(string.Format("开盘价均值{0}小时", hour),closeMeanValue);

            this.MeanValue.Remove(string.Format("收盘价均值{0}小时", hour));
            this.MeanValue.Add(string.Format("收盘价均值{0}小时", hour), openMeanValue);

            this.MeanValue.Remove(string.Format("最高价均值{0}小时", hour));
            this.MeanValue.Add(string.Format("最高价均值{0}小时", hour), highMeanValue);

            this.MeanValue.Remove(string.Format("最高价均值{0}小时", hour));
            this.MeanValue.Add(string.Format("最高价均值{0}小时", hour), highMeanValue);
        }

        public void Save() {

        }


    }
}
