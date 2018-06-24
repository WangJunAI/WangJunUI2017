using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WangJun.Entity;
using WangJun.Utility;

namespace WangJun.Yun
{
    public class YunTask : BaseTask
    {
        public YunTask() {
            var iSysItem = this as ISysItem;
            iSysItem.ClassFullName = this.GetType().FullName;
            iSysItem._DbName = "WangJun";
            iSysItem._CollectionName = "YunTask";

        }

        public   int Save()
        {
            var session = SESSION.Current;
            var iRelationshipObjectId = this as IRelationshipObjectId;
            var iTime = this as ITime;
            var iOperator = this as IOperator;
            var iCompany = this as ICompany;
            var iStatus = this as IStatus;
            var iSysItem = this as ISysItem;


            #region iRelationshipObjectId
            if (null != iRelationshipObjectId && iRelationshipObjectId._OID == ObjectId.Empty) ///新对象
            {
                iRelationshipObjectId._OID = ObjectId.GenerateNewId();
            }
            #endregion

            #region ITime
            if (null != iTime && iTime.CreateTime == DateTime.MinValue) ///新对象
            {
                iTime.CreateTime = DateTime.Now;
                iTime.UpdateTime = DateTime.Now;
            }
            #endregion

            #region IOperator
            if (null != iOperator && string.IsNullOrWhiteSpace(iOperator.CreatorID)) ///新对象
            {
                iOperator.CreatorID = session.UserID;
                iOperator.CreatorName = session.UserName;
                iOperator.ModifierID = session.UserID;
                iOperator.ModifierName = session.UserName;
                if (StringChecker.IsZeroString(iOperator.OwnerID)|| string.IsNullOrWhiteSpace( iOperator.OwnerID)) ///企业的应该界面赋值
                {
                    iOperator.OwnerID = session.UserID; ///数据所有者
                    iOperator.OwnerName = session.UserName;
                }
            }
            #endregion

            #region ICompany
            if (null != iCompany && string.IsNullOrWhiteSpace(iCompany.CompanyID))
            {
                iCompany.CompanyID = session.CompanyID;
                iCompany.CompanyName = session.CompanyName;
            }
            #endregion

            #region IStatus
            if (null != iStatus && string.IsNullOrWhiteSpace(iStatus.Status))
            {
                iStatus.StatusCode = (int)EnumStatus.正常;
                iStatus.Status = EnumStatus.正常.ToString();
            }
            #endregion

            

            #region iSysItem
            if (null != iSysItem)
            {
                EntityManager.GetInstance().Save<YunTask>(this);
                return (int)EnumResult.成功;
            }
            #endregion


            



            return (int)EnumResult.失败;
        }
        public static YunTask Load(string id)
        {
            var res = EntityManager.GetInstance().Get<YunTask>(id);
            return res;
        }

        public static int Remove(string id)
        {
            return EntityManager.GetInstance().Remove<YunTask>(id);
        }

        public static int Delete(string id)
        {
            return EntityManager.GetInstance().DeleteOne<YunTask>(id);
        }

        #region 基本方法
        public static YunTask CreateAsCheckPoint(Dictionary<string,object> data)
        {
            var title = data["Title"].ToString();
            var summary = data["Summary"].ToString();
 
            var inst = new YunTask();

            inst.Title = title;
            inst.Summary = summary;
            if (inst._GID == Guid.Empty)
            {

            }
            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        public static YunTask CreateAsTask(Dictionary<string, object> data)
        {
            var title = data["Title"].ToString();
            var expectedStopTime =DateTime.Parse( data["ExpectedStopTime"].ToString());
            var status =  data["Status"].ToString();
            var statusCode = int.Parse(Enum.Parse(typeof(EnumStatus), status).ToString());

            var inst = new YunTask();

            inst.Title = title;
            inst.ExpectedStopTime = expectedStopTime;
            inst.Status = status;
            inst.StatusCode = statusCode;

            var iTime = inst as ITime;
            iTime.CreateTime = DateTime.Now;
            iTime.UpdateTime = iTime.CreateTime;


            return inst;
        }
        #endregion
    }
}
