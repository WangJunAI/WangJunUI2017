using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Tools;

namespace WangJun.Yun
{
    public class YunAI
    {
        public static YunAI GetInstance()
        {
            var inst = new YunAI();
            return inst;
        }

        ///智能新闻配图
        public string GetPicByKeyword(string keyword,string sizeInfo=null)
        {
            var res = DataSourceBaidu.GetInstance().GetPic(keyword,sizeInfo);
            return res;

        }

        public object FenCi(string input) {
            var res = WangJun.AI.FenCi.GetResult(input);
            return res;
        }
    }
}
