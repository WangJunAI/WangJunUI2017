using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WangJun.Entity
{
    /// <summary>
    /// 实体状态
    /// </summary>
    public enum EnumStatus
    {
        正常=1,
        删除=-1,
        处理中=2,


        未开始=11,
        进行中=12,
        如期完成=13,
        超时完成 = 14,


    }
}
