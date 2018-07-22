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
    }
}
