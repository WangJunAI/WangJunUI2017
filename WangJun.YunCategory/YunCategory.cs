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
            this.CompanyID = SESSION.Current.CompanyID;
            this.CompanyName = SESSION.Current.CompanyName;
            this.CreatorID = SESSION.Current.UserID;
            this.CreatorName = SESSION.Current.UserName;
            this.ModifierID = SESSION.Current.UserID;
            this.ModifierName = SESSION.Current.UserName;
            this.OwnerID = SESSION.Current.UserID;
            this.OwnerName = SESSION.Current.UserName;

            EntityManager.GetInstance<YunCategory>().Save(this);
            return base.Save();
        }

        public static YunCategory Load(long id)
        {
            var res = EntityManager.GetInstance<YunCategory>().List.Find(new object[] { id });
            return (null == res) ? new YunCategory() : res;
        }

        public override int Remove()
        {
            EntityManager.GetInstance<YunCategory>().Remove(this);
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
