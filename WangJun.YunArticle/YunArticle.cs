using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;

namespace WangJun.Yun
{
    public class YunArticle:BaseArticle
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
            EntityManager.GetInstance<YunArticle>().Save(this);
            return base.Save();
        }
        public static YunArticle Load(long id)
        {
            var res = EntityManager.GetInstance<YunArticle>().List.Find(new object[] { id });
            return res;
        }

        public override int Remove()
        {
            return base.Remove();
        }

        #region 基本方法
        public static YunArticle CreateAsHtml()
        {
            var inst = new YunArticle();

            var iArticle = inst as IArticle;
            iArticle.ContentType = "html"; 

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        #endregion
    }
}
