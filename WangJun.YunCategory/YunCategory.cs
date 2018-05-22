using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;

namespace WangJun.Yun
{
    public class YunCategory:BaseCategory
    {
        public override int Save()
        {
            EntityManager.GetInstance<YunCategory>().Save(this);
            return base.Save();
        }

        public override int Load()
        {
            return base.Load();
        }

        public override int Remove()
        {
            return base.Remove();
        }

        #region 基本方法
        public static YunCategory CreateAsNew(string name)
        {
            var inst = new YunCategory();

            var iName = inst as IName;
            iName.Name = name;


            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        #endregion
    }
}
