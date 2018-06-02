using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunPermisssion:BasePermission
    {
        public YunPermisssion() {
            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunPermisssion";
        }

        public int Save()
        {
            var iSysItem = this as ISysItem;
            if (Guid.Empty == this._ID) {
                this._ID = SUID.New();
            }
            if (null != iSysItem)
            {
                EntityManager.GetInstance().Save<YunPermisssion>(this);
                return (int)EnumResult.成功;
            }
            return (int)EnumResult.失败;
        }
    }
}
