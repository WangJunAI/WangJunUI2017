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
        public static YunComment CreateAsText(IApp app,string content, ISysItem iSys=null)
        {
            var inst = new YunComment();

            var iComment = inst as IComment;
            iComment.ContentType = "text";
            iComment.Content = content;

            var iApp = inst as IApp;
            iApp.AppCode = app.AppCode;
            iApp.AppName = app.AppName;
            iApp.Version = app.Version;

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;

            var iSysItem = inst as ISysItem;
            inst.ClassFullName = iSys.ClassFullName;
            inst._CollectionName = iSys._CollectionName;
            inst._DbName = iSys._DbName;
            inst._SourceID = iSys._SourceID;


            return inst;
        }
        #endregion
    }
}
