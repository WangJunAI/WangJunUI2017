using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Forex
{
    public class ForexItem
    {
        public float Open { get; set; }

        public float Close { get; set; }

        public float High { get; set; }

        public float Low { get; set; }

        public string Name { get; set; }

        public string Tag1 { get; set; }

        /// <summary>
        /// 均值
        /// </summary>
        public Dictionary<string,float> MeanValue { get; set; }

        /// <summary>
        /// 所在位置
        /// </summary>
        public Dictionary<string, float> Position { get; set; }

        public float HLLength
        {
            get
            {
                return Math.Abs( this.High - this.Low);
            }
        }

        public float OCLength
        {
            get
            {
                return Math.Abs(this.Close - this.Open);
            }
        }

        public int IsRed
        {
            get
            {
                return (this.Open <= this.Close) ? 1 : -1;
            }
        }




        public string OCPercent
        {
            get
            {
                var val = 0.0f;
                val = this.IsRed*(this.OCLength / this.HLLength);
                var str = string.Format("{0:0}0%", val*10);
                return str;
            }
        }

        public DateTime Time { get; set; }

        public static ForexItem Parse(string name ,string open, string close, string high, string low, string date,string time)
        {
            var inst = new ForexItem();
            inst.Name = name;
            inst.Open = float.Parse(open);
            inst.Close = float.Parse(close);
            inst.Low = float.Parse(low);
            inst.High = float.Parse(high);
            inst.Time= DateTime.Parse(string.Format("{0} {1}",date,time));
            return inst;
        }


    }
}
