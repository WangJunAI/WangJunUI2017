using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;

namespace WangJun.Yun
{
    public class YunComment:BaseComment
    {
        public override int Save()
        {
            EntityManager.GetInstance<YunComment>().Save(this);
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
        public static YunComment CreateAsText()
        {
            var inst = new YunComment();

            var iComment = inst as IComment;
            iComment.ContentType = "text";

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        #endregion
    }
}
