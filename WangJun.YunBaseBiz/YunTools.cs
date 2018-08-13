using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Net;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunTools
    {
        public object CreateSUID()
        {
            return SUID.New();
        }

        public object CreateSUIDArray(string input)
        {
            var count = int.Parse(input);
            if (count < 1000)
            {
                var list = new List<Guid>();
                for (int k = 0; k < count; k++)
                {
                    list.Add(SUID.New());
                }
                return list;
            }
            return null;
        }

        public object HTTPGet(string url) {

            return HTTP.GetInstance().GetString(url);
        }
    }
}
