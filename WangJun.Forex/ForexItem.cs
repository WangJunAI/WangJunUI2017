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

        public string HLPercent
        {
            get
            {
                var val = 0.0f;
                val = Math.Abs(this.Open - this.Close) / (this.High - this.Low);
                val = (0 <= (this.Open - this.Close)) ? val : -1 * val;
                var str = string.Format("{0:00}%", val*100);
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
