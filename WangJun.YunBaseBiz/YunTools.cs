using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunTools
    {
        public object CreateSUID()
        {
            return SUID.New();
        }

        public object CreateSUIDArray(int count=10)
        {
            if (count < 100)
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
    }
}
