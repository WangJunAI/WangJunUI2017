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
            EntityManager.GetInstance<YunArticle>().Save(this);
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
