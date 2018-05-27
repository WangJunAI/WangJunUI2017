using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity.基础业务对象
{
    public class BaseUser
    {
        public string RealName { get; set; }

        public string NickName { get; set; }

        public string PicHead { get; set; }

        public Guid Password { get; set; }
    }
}
