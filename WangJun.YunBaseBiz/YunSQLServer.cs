using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.DB;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunSQLServer
    {
        public object Execute(string input)
        {
            var dict = Convertor.FromJsonToDict2(input);
            var sql = dict["SQL"].ToString();
            SQLServer.Register("百度云", "Data Source=106.12.24.68;Initial Catalog=WangJun;Persist Security Info=True;User ID=sa;Password=111qqq!!!");
            var inst = SQLServer.GetInstance("百度云");
            var res = inst.Find(sql);
            return res;
        }
    }
}
